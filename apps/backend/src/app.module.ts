import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';

import {environment} from './environment';
import {MailModule} from './mail/mail.module';
import {PollModule} from './poll/poll.module';
import {PushModule} from './push/push.module';
import {StatisticsModule} from './statistics/statistics.module';
import {TokenModule} from './token/token.module';

@Module({
    imports: [
        MongooseModule.forRoot(environment.mongo.uri),
        PollModule,
        TokenModule,
        StatisticsModule,
        MailModule,
        PushModule,
    ],
})
export class AppModule {
}
