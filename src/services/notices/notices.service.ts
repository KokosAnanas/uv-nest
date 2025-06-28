import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Notice, NoticeDocument} from "../../shemas/notice";
import {Model} from "mongoose";
import {NoticeDto} from "../../dto/notice-dto";
import {filter} from "rxjs";
import {User} from "../../shemas/user";
import {INotice} from "../../interfaces/notice.interface";

@Injectable()
export class NoticesService {
    private noticesCount = 10;

    constructor(@InjectModel(Notice.name)
                private noticeModel: Model<NoticeDocument>) {}

// добавить в БД
    async generateNotices() {
        for (let i = 0; i <= this.noticesCount; i++) {
            const notice = new NoticeDto();
            const noticeData = new this.noticeModel(notice);
            await noticeData.save();
        }
    }

// удалить из БД
    async deleteNotices(): Promise<any> {
        return this.noticeModel.deleteMany({})
    }

    async getAllNotices(): Promise<Notice[]> {
        return this.noticeModel.find()
    }

    async getNoticeById(id): Promise<INotice | null> {
        return this.noticeModel.findById(id);
    }

    async uploadNotice(body: INotice) {
        const notice = new this.noticeModel(body);  // без лишнего DTO
        return notice.save();
    }
}


