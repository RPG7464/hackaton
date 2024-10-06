import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.schema';
import { Model } from 'mongoose';
import { Activity } from 'src/activity/entities/activity.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly UserModel: Model<User>,
    @InjectModel(Activity.name) private readonly ActivityModel: Model<Activity>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const existingEmail = await this.UserModel.findOne({
      email: createUserDto.email,
      isActive: true,
    });
    if (!existingEmail) {
      const activity = await this.ActivityModel.findOne({
        _id: createUserDto.activityId,
        isActive: true,
      });
      const count = await this.UserModel.find({
        activity: activity.id,
        isActive: true,
      }).countDocuments();

      if (count < activity.capacity) {
        return this.UserModel.create({
          ...createUserDto,
          activity: createUserDto.activityId,
        });
      }
      throw new BadRequestException(
        `Activity ${activity.name} is full of capacity`,
      );
    }
    throw new BadRequestException(
      `The user with email ${existingEmail.email} alredy exists`,
    );
  }

  async findAll() {
    const data = await this.UserModel.find({
      isActive: true,
    }).exec();
    const count = await this.UserModel.find({ isActive: true })
      .countDocuments()
      .exec();
    return { data, count };
  }

  findOne(id: string) {
    return this.UserModel.findOne({
      _id: id,
      isActive: true,
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.UserModel.findOne({
      _id: id,
      isActive: true,
    });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    if (updateUserDto.activityId) {
      const activity = await this.ActivityModel.findById(
        updateUserDto.activityId,
      );
      const count = await this.UserModel.find({
        activity: activity.id,
      }).countDocuments();
      if (count >= activity.capacity) {
        throw new BadRequestException(`Activity with id${activity.id} is full`);
      }
      user.set({ activity: updateUserDto.activityId });
    }
    if (updateUserDto.email) {
      const existingEmail = await this.UserModel.findOne({
        email: updateUserDto.email,
        isActive: true,
      });
      if (existingEmail) {
        throw new BadRequestException(
          `The email ${existingEmail.email} alredy exists`,
        );
      }
    }
    user.set(updateUserDto);
    try {
      return await user.save();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(id: string) {
    try {
      const user = await this.UserModel.findById(id);
      if (!user) {
        throw new NotFoundException(`User with id ${id} not found`);
      }
      user.set({ isActive: false });
      return user.save();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
