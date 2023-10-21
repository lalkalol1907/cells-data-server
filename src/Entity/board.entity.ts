import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Cell } from './cell.entity';
import EnumBoardType from '../Struct/EnumBoardType';

@Entity()
export class Board {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  owner_uuid: string;

  @Column()
  type: EnumBoardType;

  @Column()
  preview_url: string;

  @OneToMany(() => Cell, (cell) => cell.board)
  cells: Cell;
}
