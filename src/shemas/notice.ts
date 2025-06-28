import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import {INotice, INoticeViolation} from "../interfaces/notice.interface";

export type NoticeDocument = HydratedDocument<Notice>;

@Schema()
export class Notice implements INotice {
    @Prop() orgName: string;
    @Prop() noticeNum: string;
    @Prop({ type: Date, required: true })
    noticeDate: Date;
    @Prop() toWhom: string;
    @Prop() copyTo: string;
    @Prop() specialist: string;
    @Prop() present: string;
    @Prop() objectName: string;
    @Prop() workType: string;
    @Prop() violations: INoticeViolation[];
    @Prop() actions: string;
    @Prop() contacts: string;
    @Prop({ type: [String], default: [] }) photos: string[];
}

export const NoticeSchema = SchemaFactory.createForClass(Notice);
//
//
// @Schema()
// export class Notice {
//     @Prop() orgName: string;             // организация (СК заказчика)
//     @Prop() noticeNum: string;           // номер уведомления
//     @Prop({ type: Date, required: true })
//     noticeDate: Date;                    // дата уведомления
//     @Prop() toWhom: string;              // кому направлено
//     @Prop() copyTo: string;              // копия кому
//     @Prop() specialist: string;          // специалист СК (составивший уведомление)
//     @Prop() present: string;             // присутствующие (подрядчики)
//     @Prop() objectName: string;          // объект строительства
//     @Prop() workType: string;            // вид выполняемых работ
//     @Prop() violations: INoticeViolation[];  // Список нарушений
//     @Prop() actions: string;            // предписанные действия
//     @Prop() contacts: string;           // Контактные данные
//     @Prop({ type: [String], default: [] }) photos: string[]; // файлы фото
// }