import { DateTime } from "luxon";

export interface IGetFixedAssets{
    id?: number,
    plate: string,
    description: string,
    acquisitionDate: DateTime,
    equipmentStatus: number,
    userIdentification: string,
    area: number,
    fullName: string,
    model: string,
    measure: string,
    activeOwner: number,
    observation: string,
    clerk: number
}