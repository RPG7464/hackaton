import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Activity } from 'src/activity/entities/activity.entity';

@Schema()
export class User extends Document {
  @Prop()
  name: string;

  @Prop()
  lastname: string;

  @Prop()
  email: string;

  @Prop()
  age: number;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: Activity.name,
    required: true,
  })
  activity: Activity;

  @Prop({
    type: Boolean,
    default: true,
  })
  @Exclude()
  isActive: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
