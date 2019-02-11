import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class CalcProvider {

  constructor(public http: HttpClient) {
    
  }
  calculateBenefit(dob, income, statement) {
    let startAge = [62, 63, 64, 65, 66, 67, 68, 69, 70];
    let dobYear = Number(dob.substr(0, 4));
    let monthlyIncome = income / 12;
    let fra;
    let fullBen;
    let monthlyBen = [];
    let benObj = {};

    if (dobYear <= 1937) {
      fra = 780;
    }        else if (dobYear < 1943) {
      fra = 780 + ((dobYear - 1937) * 2);
    }        else if (dobYear < 1955) {
      fra = 792;
    }        else if (dobYear < 1960) {
      fra = 792 + ((dobYear - 1954) * 2);
    }        else {
      fra = 804;
    }

      // 5% discount for every year prior to fra.  .4666667/month
      // 8& increase per year past fra .667/month
      // ssi primary insurance calculation 2018

    if (statement === 'true') {
      startAge.map((x)=> {
        if (x * 12 < fra) {
          let factor = 1 - ((fra - (x * 12)) * .0041667);
          monthlyBen.push(Math.floor(income * factor));
        } else if (x * 12 === fra) {
          monthlyBen.push(Math.floor(income));
        } else {
          let factor = 1 + (((x * 12) - fra) * .00667);
          monthlyBen.push(Math.floor(income * factor));
        }
      });
    } else {
      fullBen = monthlyIncome > 5397 ? 805.5 + ((monthlyIncome - 895) * .32) +
        ((monthlyIncome - 6292) * .15) : 805.5 + ((monthlyIncome - 895) * .32);

      fullBen = fullBen > 2788 ? 2788 : fullBen;

      startAge.map((x)=> {
        if ((x * 12) < fra) {
          let factor = 1 - ((fra - (x * 12)) * .0041667);
          monthlyBen.push(Math.floor(fullBen * factor));
        } else if (x * 12 === fra) {
          monthlyBen.push(Math.floor(fullBen));
        } else {
          let factor = 1 + (((x * 12) - fra) * .00667);
          monthlyBen.push(Math.floor(fullBen * factor));
        }
      });
    }

    startAge.forEach((age, i) => {
      benObj[age] = {monthlyBen: monthlyBen[i]};
    });
    
    return benObj;
  }
}
