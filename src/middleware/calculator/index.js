'use strict';

const THIS_YEAR = currentStudyYear();

export default {
    calculateAllYears,
    currentStudyYear,
}


function calculateAllYears(personalDetails, financialDetails) {
        const years = {};
        const YOUNGEST_CHILD = findYoungest(personalDetails.children);
        const LAST_PAYMENTS_YEAR = lastPaymentsYear(YOUNGEST_CHILD)
        for (let year = THIS_YEAR; year <= LAST_PAYMENTS_YEAR+1; year++) {
            years[year] = yearPaymentsCalculator({year, children: personalDetails.children, financialDetails})
        }
        let totalDebt = 0;
        for (let year = THIS_YEAR; year <= LAST_PAYMENTS_YEAR+1; year++) {
            totalDebt += years[year].totalDebt;
        }
        const average = Math.round(totalDebt / (LAST_PAYMENTS_YEAR - THIS_YEAR + 1));
        const debtCalculation = {totalDebt, years, average};
        return debtCalculation;
}

function yearPaymentsCalculator(params) {
    let year = {children: []};
    let childrenAtHome = params.children.length;
    for (let child of params.children) {
        let childYearDetails = {name: child.name};
        const grade = params.year - child.firstGradeYear + 1;
        childYearDetails.institution =
            (grade < -2) ? 'מעון' :
                (grade < 1) ? 'גן' :
                    (grade < 9) ? 'יסודי' :
                        (grade < 13) ? 'תיכון' :
                            (child.gender === 'male') ?
                                (grade < 16 ? 'צבא' : 'בוגר/ת') : (grade < 15 ? 'צבא' : 'בוגר/ת');
        childYearDetails.alimony = params.financialDetails.alimonyPerChild;
        switch (childYearDetails.institution) {
            case 'מעון':
                childYearDetails.eduCost = params.financialDetails.maon;
                break;
            case 'גן':
                childYearDetails.eduCost = params.financialDetails.kidergarten;
            case 'יסודי':
                childYearDetails.eduCost = params.financialDetails.elementarySchool;
                break;
            case 'תיכון':
                childYearDetails.eduCost = params.financialDetails.highSchool;
                break;
            case 'צבא':
                childrenAtHome--;
                childYearDetails.eduCost = 0;
                childYearDetails.alimony = childYearDetails.alimony / 3;
                break;
            case 'בוגר/ת':
                childrenAtHome--;
                childYearDetails.eduCost = 0;
                childYearDetails.alimony = 0;
                break;
        }
        year.children.push(childYearDetails);
    }
    let totalEduMonthly = 0;
    let alimonyMonthly = 0;
    for (let child of year.children) {
        totalEduMonthly += child.eduCost;
        alimonyMonthly += child.alimony;
    }
    year.education = totalEduMonthly * 12;
    year.alimony = alimonyMonthly * 12;
    year.mador =
        ((childrenAtHome >= 3) ? 1 :
            (childrenAtHome === 2) ? 0.8 :
                (childrenAtHome === 1) ? 0.6 : 0) * params.financialDetails.madorFor3children * 12;

    year.divorceeExpens = params.financialDetails.divorceeExpens * 12;
    if (year.children[year.children.length-1].institution==='בוגר/ת'){
        year.divorceeExpens=0;
    }
    year.totalDebt = year.alimony + year.mador + year.divorceeExpens + year.education;
    return year;
}


function currentStudyYear() {
    const today = new Date;
    const thisMonth = today.getMonth();
    let currentStudyYear = today.getFullYear();
    if (thisMonth < 8) currentStudyYear--;
    return currentStudyYear;
}

function findYoungest(childrenArr) {
    let youngest = {firstGradeYear: 0};
    for (let child of childrenArr) {
        if (youngest.firstGradeYear < child.firstGradeYear) {
            youngest = child;
        }
    }
    return youngest;
}

function lastPaymentsYear(youngest) {
    if (youngest.gender === `male`) {
        return youngest.firstGradeYear + 14;
    } else {
        return youngest.firstGradeYear + 13;
    }
}


