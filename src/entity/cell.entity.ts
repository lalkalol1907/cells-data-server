import {
  Entity,
  JoinColumn,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Board } from './board.entity';

@Entity()
export class Cell {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @ManyToMany(() => Board, (board) => board.cells)
  @JoinColumn()
  board: Board;
}
