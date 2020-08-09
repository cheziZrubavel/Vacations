export class VacationModel {

    public constructor(
        public id?: number, public description?: string, public destination?: string, public image?: string, public fromDate?: Date,public toDate?: Date,public price?: number, public followers?: number) {
    }
}