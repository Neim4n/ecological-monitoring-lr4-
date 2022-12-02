import { Component, OnInit } from '@angular/core';
import { DataBaseService } from "../../core/services/data-base/data-base.service";
import { delay, finalize } from "rxjs";

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
    rivers: any[];
    loading: boolean = false;
    isChecked: boolean = false;
    isEditing: boolean = false;

    riskTypes: any = {
        'A': 'Ризик за водневим показником',
        'B': 'Потенційний ризик за органолептичними показниками',
        'C': 'Потенційний ризик токсикологічної небезпеки питної води',
        'D': 'Потенційний ризик епідеміологічної небезпеки поверхневих вод',
        'E': 'Потенційний ризик токсикологічної небезпеки поверхневих вод',
    }

    probRisk: any = {
        '-3.0': 0.001,
        '-2.9': 0.002,
        '-2.8': 0.003,
        '-2.7': 0.004,
        '-2.6': 0.005,
        '-2.5': 0.006,
        '-2.4': 0.09,
        '-2.3': 0.014,
        '-2.2': 0.018,
        '-2.1': 0.021,
        '-2.0': 0.023,
        '-1.9': 0.029,
        '-1.8': 0.036,
        '-1.7': 0.045,
        '-1.6': 0.055,
        '-1.5': 0.067,
        '-1.4': 0.081,
        '-1.3': 0.097,
        '-1.2': 0.115,
        '-1.1': 0.136,
        '-1.0': 0.157,
        '-0.9': 0.184,
        '-0.8': 0.212,
        '-0.7': 0.242,
        '-0.6': 0.274,
        '-0.5': 0.309,
        '-0.4': 0.345,
        '-0.3': 0.382,
        '-0.2': 0.421,
        '-0.1': 0.460,
        '0': 0.50,
        '3.0': 0.999,
        '2.9': 0.999,
        '2.8': 0.997,
        '2.7': 0.996,
        '2.6': 0.995,
        '2.5': 0.994,
        '2.4': 0.991,
        '2.3': 0.988,
        '2.2': 0.984,
        '2.1': 0.980,
        '2.0': 0.977,
        '1.9': 0.971,
        '1.8': 0.964,
        '1.7': 0.955,
        '1.6': 0.945,
        '1.5': 0.933,
        '1.4': 0.919,
        '1.3': 0.903,
        '1.2': 0.885,
        '1.1': 0.864,
        '1.0': 0.841,
        '0.9': 0.816,
        '0.8': 0.788,
        '0.7': 0.758,
        '0.6': 0.726,
        '0.5': 0.692,
        '0.4': 0.655,
        '0.3': 0.618,
        '0.2': 0.579,
        '0.1': 0.540,
    }

    riskProperties: any = {
        pH: 'Водневий показник',
        F: 'Природна забарвленість води',
        C: 'Забарвленість води',
        AT: 'Час усереднення',
        BW: 'Вага',
        CW: 'Розрахункова величина',
        ED: 'Тривалість життя',
        EF: 'Частка експозиції',
        GDK: 'Норматив',
        IR: 'Рівень споживання',
        K3: 'Коефіцієнт запасу',
        OSF: 'Одиниця ризику',
        C1: 'Концентрація речовини',
        X1: 'К-сть лактозо-позитивних кишкових паличок',
        X2: 'Індекс ентерококів',
        X3: 'Індекс коліфагів'
    }

    constructor(private dataBaseService: DataBaseService) {
    }

    ngOnInit(): void {
        this.loadAreas();
    }

    loadAreas() {
        this.loading = true;

        this.dataBaseService.getRivers()
            .pipe(
                delay(300),
                finalize(() => this.loading = false)
            )
            .subscribe((res: any) => {
                this.rivers = res;
                console.log(res)
            });
    }

    calculateRisks() {
        this.rivers.forEach((object: any) => {
            object.risks.forEach((risk: any) => {
                if (risk.type === "A") {
                    risk.Prob = -11 + risk.pH;
                    risk.risk = risk.Prob < -3 ? this.probRisk['-3.0'] : risk.Prob > 3 ? this.probRisk['3.0'] : this.probRisk[risk.Prob.toFixed(1)]
                } else if (risk.type === "B") {
                    risk.Prob = -3.33 + 0.067 * (risk.C - risk.F + 20);
                    risk.risk = this.probRisk[risk.Prob.toFixed(1)]
                } else if (risk.type === "C") {
                    const {OSF, GDK, K3, CW, IR, EF, ED, BW, AT} = risk
                    risk.LADD = CW * IR * EF * (ED / BW) * AT;
                    risk.Clim = GDK * K3;
                    risk.risk = 1 - Math.exp(Math.log10(OSF) / risk.Clim) * risk.LADD;
                } else if (risk.type === "D") {
                    const {X1, X2, X3} = risk
                    risk.risk = 2.894 - 2.94 * Math.pow(10, -5) * X1 + 7.93 * Math.pow(10, -4) * X2 + 2.77 * Math.pow(10, -4) * X3;
                } else if (risk.type === "E") {
                    const {OSF, GDK, K3, C} = risk
                    risk.risk = 1 - Math.exp(Math.log10(OSF) / (GDK * K3 * 4)) * C;
                }

                risk.risk = risk.risk.toFixed(3);
            })
        })
    }

    toggleObjectEdit(index: number) {
        this.rivers[index].isEditing = !this.rivers[index].isEditing;
    }

    saveEditObject(index: number) {
        const editGeoObject = this.rivers[index];
        delete editGeoObject.isEditing;
        this.dataBaseService.saveResults(editGeoObject.id, editGeoObject).subscribe((res) => console.log(res));
    }

    onDelete(id: number) {
        if (confirm("Ви впевнені, що хочете видалити?")) {
            this.rivers = this.rivers.filter((object: any) => object.id !== id);
            this.dataBaseService.deleteRiver(id)
                .subscribe((res: any) => console.log(res),
                    (err) => console.error(err));
        }
    }

    onShowClick(risk: any) {
        risk['show'] = !risk['show'];
    }

}
