import {Body, Controller, Delete, Get, Param, Post, UseGuards} from '@nestjs/common';
import {NoticesService} from "../../services/notices/notices.service";
import {JwtAuthGuard} from "../../services/authentication/jwt-auth.guard/jwt-auth.guard.service";
import {ValidationParamIdPipe} from "../../pipes/param.pipe";
import {INotice} from "../../interfaces/notice.interface";

@Controller('notices')
export class NoticesController {

    constructor(private noticesService: NoticesService) {
    }

    @Post()
    create(@Body() dto: INotice) {
        return this.noticesService.uploadNotice(dto);
    }

    @Post('seed')
    initNotices() {
        return this.noticesService.generateNotices();
    }

    @Delete()
    removeAllNotices(): void {
        this.noticesService.deleteNotices();
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    getAllNotices() {
        return this.noticesService.getAllNotices();
    }

    // @UseGuards(JwtAuthGuard)
    // @Get(':id')
    // getNoticeById(@Param('id') id: string): Promise<INotice> {
    //     return this.NoticesService.getNoticeById(id)
    // }

    @Get(':id')
    getNoticeById(@Param('id', ValidationParamIdPipe) id: string): Promise<INotice | null> {
        return this.noticesService.getNoticeById(id)
    }


}

