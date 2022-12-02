import { Component, OnInit, ViewChild } from '@angular/core';
import { DataBaseService } from "../../core/services/data-base/data-base.service";
import { NgForm } from "@angular/forms";

@Component({
    selector: 'app-add-form',
    templateUrl: './add-form.component.html',
    styleUrls: ['./add-form.component.scss']
})
export class AddFormComponent implements OnInit {
    @ViewChild('f') formControl: NgForm;

    form: any = {
        name: null,
        type: null,
        additional_information: {
            year: null,
            url: null
        }
    }

    onChangeTypeSelect() {
        this.form.emissions_info.tax_rates = null;
        delete this.form.pH;
        delete this.form.emissions_info.position_rate;
        delete this.form.emissions_info.water_atmosphere_rate;
        delete this.form.emissions_info.emissions_radioactive_type;
        delete this.form.emissions_info.number_of_quarters;
        delete this.form.emissions_info.rv_rate;
        delete this.form.emissions_info.rns_rate;
        delete this.form.emissions_info.c1v_rate;
        delete this.form.emissions_info.c1ns_rate;
        delete this.form.emissions_info.c2v_rate;
        delete this.form.emissions_info.c2ns_rate
        delete this.form.emissions_info.V1v_rate;
        delete this.form.emissions_info.V1ns_rate;
        delete this.form.emissions_info.V2v_rate;
        delete this.form.emissions_info.V2ns_rate;
        delete this.form.emissions_info.On;

        console.log(this.form.emissions_info.emissions_type);
        switch (this.form.type) {
            case ('1'):
                this.form.pH = null;
                break
            case ('2'):
                this.form.pH = null;
                break;
            case ('3'):
                this.form.emissions_info.position_rate = null;
                this.form.emissions_info.water_atmosphere_rate = null;
                break;
            case ('4'):
                this.form.emissions_info.tax_rates = 0.0127;
                this.form.emissions_info.rv_rate = 50;
                this.form.emissions_info.rns_rate = 2;
                this.form.emissions_info.c1v = null;
                this.form.emissions_info.c1ns = null;
                this.form.emissions_info.c2v = null;
                this.form.emissions_info.c2ns = null;
                this.form.emissions_info.V1v = null;
                this.form.emissions_info.V1ns = null;
                this.form.emissions_info.V2v = null;
                this.form.emissions_info.V2ns = null;
                this.form.emissions_info.On = null;
                break;
            case ('5'):
                this.form.emissions_info.emissions_radioactive_type = null;
                this.form.emissions_info.number_of_quarters = null;
                break;
            default:
                break;
        }

        console.log(this.form);
    }

    constructor(private dataBaseService: DataBaseService) {
    }

    ngOnInit(): void {
    }

    onSubmit(): void {
        console.log(this.form);
        if (this.formControl.form.valid) {

            this.form.emissions_info = [this.form.emissions_info];

            this.dataBaseService.addNewRiver(this.form)
                .subscribe((res: any) => console.log(res),
                    (err) => console.error(err),
                    () => {
                        this.formControl.form.reset();
                        this.form = {
                            name: null,
                            POP: null,
                            HI: null,
                            emissions_info: {
                                pollutant_name: null,
                                LADD: null,
                                Tout: null,
                                Vout: null,
                                Tin: null,
                                Vin: null,
                                BW: null,
                                AT: null,
                                EF: null,
                                ED: null,
                                Ca: null,
                                Ch: null,
                                HQ: null,
                                AC: null,
                                RfC: null,
                                CR: null,
                                SF: null,
                                PCR: null
                            },
                            additional_information: {
                                year: null,
                                url: null
                            }
                        }
                    });
        }
    }
}
