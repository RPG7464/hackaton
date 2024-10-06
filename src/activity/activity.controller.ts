import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  Res,
} from '@nestjs/common';
import { ActivityService } from './activity.service';
import {
  CreateActivityDto,
  ImportActivityDto,
} from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { promises as fs } from 'fs';
import * as path from 'path';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

@ApiTags('activity')
@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Post()
  create(@Body() createActivityDto: CreateActivityDto) {
    return this.activityService.create(createActivityDto);
  }

  @Get()
  findAll() {
    return this.activityService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.activityService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateActivityDto: UpdateActivityDto,
  ) {
    return this.activityService.update(id, updateActivityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.activityService.remove(id);
  }

  @Post('import')
  async getData(@Body() activityDto: ImportActivityDto) {
    console.log(activityDto.filename);
    try {
      const filePath = path.join(
        process.cwd(),
        'src',
        'file',
        `${activityDto.filename}.json`,
      );

      const jsonData = await fs.readFile(filePath, 'utf-8');
      let dataArray = JSON.parse(jsonData);

      if (!Array.isArray(dataArray)) {
        dataArray = [dataArray];
      }

      for (const item of dataArray) {
        await this.activityService.create(item);
      }
      return { message: 'Data imported successfully' };
    } catch (error) {
      console.error('Error reading JSON file', error);
      throw new BadRequestException('Could not load data');
    }
  }

  @Post('export')
  async exportActivities(@Res() res: Response) {
    const activities = await this.activityService.findAll();

    const jsonData = JSON.stringify(activities, null, 2);

    res.setHeader('Content-Type', 'application/json');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=activities.json',
    );

    return res.send(jsonData);
  }
}
