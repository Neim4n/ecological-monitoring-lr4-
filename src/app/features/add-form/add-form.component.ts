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
        risks : {
            type: null,
            risk: null
        }
    }

    onChangeTypeSelect() {
        //a
        delete this.form.risks.pH;
        //b
        delete this.form.risks.F;
        delete this.form.risks.C;

        delete this.form.risks.Prob;
        //c
        delete this.form.risks.OSF;
        delete this.form.risks.GDK;
        delete this.form.risks.K3;
        delete this.form.risks.CW;
        delete this.form.risks.IR;
        delete this.form.risks.EF;
        delete this.form.risks.ED;
        delete this.form.risks.BW;
        delete this.form.risks.AT;
        delete this.form.risks.Clim;
        delete this.form.risks.LADD;

        //d
        delete this.form.risks.X1;
        delete this.form.risks.X2;
        delete this.form.risks.X3;

        //e
        delete this.form.risks.OSF;
        delete this.form.risks.GDK;
        delete this.form.risks.K3;
        delete this.form.risks.C;



        console.log(this.form.risks.type);
        switch (this.form.risks.type) {
            case ('A'):
                this.form.risks.pH  = null;
                this.form.risks.Prob = null;
                break
            case ('B'):
                this.form.risks.F = null;
                this.form.risks.C = null;
                this.form.risks.Prob = null;
                break;
            case ('C'):
                this.form.risks.OSF = null;
                this.form.risks.GDK = null;
                this.form.risks.K3 = null;
                this.form.risks.CW = null;
                this.form.risks.IR = null;
                this.form.risks.EF = null;
                this.form.risks.ED = null;
                this.form.risks.BW = null;
                this.form.risks.AT = null;
                this.form.risks.Clim = null;
                this.form.risks.LADD = null;
                break;
            case ('D'):
                this.form.risks.X1 = null;
                this.form.risks.X2 = null;
                this.form.risks.X3 = null;
                break;
            case ('E'):
                this.form.risks.OSF = null;
                this.form.risks.GDK = null;
                this.form.risks.K3 = null;
                this.form.risks.C = null;
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

            this.form.risks = [this.form.risks];

            this.dataBaseService.addNewRiver(this.form)
                .subscribe((res: any) => console.log(res),
                    (err) => console.error(err),
                    () => {
                        this.formControl.form.reset();
                        this.form = {
                            name: null,
                            risks : {
                                type: null,
                                risk: null
                            }
                        }
                    });
        }
    }
}
