import { Column, Entity, PrimaryColumn } from 'typeorm';
import crypto from 'crypto';

export enum ProjectStatus {
  Pending = 'pending',
  Active = 'active',
  Canceled = 'canceled',
  Completed = 'completed',
}

@Entity()
export class Project {
  @PrimaryColumn()
  id: string; //uuid

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ nullable: true, type: 'datetime' })
  started_at: Date | null;

  @Column({ nullable: true, type: 'datetime' })
  canceled_at: Date | null;

  @Column({ nullable: true, type: 'datetime' })
  finished_at: Date | null;

  @Column({ nullable: true, type: 'datetime' })
  forecasted_end: Date | null;

  @Column({ type: 'simple-enum' })
  status: ProjectStatus = ProjectStatus.Pending;

  constructor(
    props: {
      name: string;
      description: string;
      started_at?: Date | null;
      canceled_at?: Date | null;
      finished_at?: Date | null;
      forecasted_end?: Date | null;
    },
    id?: string,
  ) {
    Object.assign(this, props);
    this.id = id ?? crypto.randomUUID();

    if (props?.started_at) {
      this.start(props.started_at);
    }
  }

  start(started_at: Date) {
    if (this.status === ProjectStatus.Active) {
      throw new Error('Cannot start actived project');
    }

    if (this.status === ProjectStatus.Completed) {
      throw new Error('Cannot start completed project');
    }

    if (this.status === ProjectStatus.Canceled) {
      throw new Error('Cannot start canceled project');
    }

    this.started_at = started_at;
    this.status = ProjectStatus.Active;
  }

  cancel(canceled_at: Date) {
    if (this.status === ProjectStatus.Completed) {
      throw new Error('Cannot cancel completed project');
    }

    if (this.status === ProjectStatus.Canceled) {
      throw new Error('Cannot cancel canceled project');
    }

    if (canceled_at < this.started_at) {
      throw new Error('Cannot cancel project before it started');
    }

    this.canceled_at = canceled_at;
    this.status = ProjectStatus.Canceled;
  }

  finish(finished_at: Date) {
    if (this.status === ProjectStatus.Completed) {
      throw new Error('Cannot finish completed project');
    }

    if (this.status === ProjectStatus.Canceled) {
      throw new Error('Cannot finish canceled project');
    }

    if (finished_at < this.started_at) {
      throw new Error('Cannot finish project before it started');
    }

    this.finished_at = finished_at;
    this.status = ProjectStatus.Completed;
  }
}
