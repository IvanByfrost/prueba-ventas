/*
  Warnings:

  - Added the required column `cantidad` to the `ventas` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ventas" ADD COLUMN     "cantidad" INTEGER NOT NULL;
