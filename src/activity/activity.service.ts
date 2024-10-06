import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Activity } from './entities/activity.entity';
import { Model } from 'mongoose';

@Injectable()
export class ActivityService {
  constructor(
    @InjectModel(Activity.name) private readonly ActivityModel: Model<Activity>,
  ) {}

  async create(createActivityDto: CreateActivityDto) {
    return this.ActivityModel.create(createActivityDto);
  }

  async findAll() {
    return this.ActivityModel.find({
      isActive: true,
    });
  }

  async findOne(id: string) {
    return this.ActivityModel.findOne({
      _id: id,
      isActive: true,
    });
  }

  async update(id: string, updateActivityDto: UpdateActivityDto) {
    const activity = await this.ActivityModel.findOne({
      isActive: true,
      _id: id,
    });

    activity.set(updateActivityDto);

    try {
      return activity.save();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(id: string) {
    const activity = await this.ActivityModel.findById(id);
    activity.set({ isActive: false });
    return activity.save();
  }
}
