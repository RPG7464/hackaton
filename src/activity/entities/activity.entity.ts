import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { Document } from 'mongoose';

@Schema()
export class Activity extends Document {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  capacity: number;

  @Prop({
    type: Boolean,
    default: true,
  })
  @Exclude()
  isActive: boolean;
}

export const ActivitySchema = SchemaFactory.createForClass(Activity);
