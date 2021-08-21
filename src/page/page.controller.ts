import { Controller, Get, Render } from '@nestjs/common';

@Controller('page')
export class PageController {
    @Render('main.html')
    @Get()
    getpage() {
        console.log("qweqwe");
        
        return '';
    }
}
