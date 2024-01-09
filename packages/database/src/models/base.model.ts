import {
    BaseEntity,
    CreateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  import 'reflect-metadata';
  
  export class BaseModelEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: string;
  
    @CreateDateColumn({
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP(6)',
    })
    created_at: Date;
  
    @UpdateDateColumn({
      type: 'timestamp',
      default: () => 'CURRENT_TIMESTAMP(6)',
    })
    updated_at: Date;
  
    @DeleteDateColumn({
      type: 'timestamp',
    })
    deleted_at: Date;
  }
