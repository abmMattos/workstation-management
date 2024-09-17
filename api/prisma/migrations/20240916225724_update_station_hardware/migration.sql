/*
  Warnings:

  - You are about to drop the column `meetingroom_id` on the `reservation` table. All the data in the column will be lost.
  - You are about to drop the column `workstation_id` on the `reservation` table. All the data in the column will be lost.
  - You are about to drop the `meeting_room` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `workstation` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `station_id` to the `reservation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "reservation" DROP CONSTRAINT "reservation_meetingroom_id_fkey";

-- DropForeignKey
ALTER TABLE "reservation" DROP CONSTRAINT "reservation_workstation_id_fkey";

-- AlterTable
ALTER TABLE "reservation" DROP COLUMN "meetingroom_id",
DROP COLUMN "workstation_id",
ADD COLUMN     "station_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "meeting_room";

-- DropTable
DROP TABLE "workstation";

-- CreateTable
CREATE TABLE "station" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "capacity" INTEGER NOT NULL,

    CONSTRAINT "station_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "hardware" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "hardware_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_HardwareToStation" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_HardwareToStation_AB_unique" ON "_HardwareToStation"("A", "B");

-- CreateIndex
CREATE INDEX "_HardwareToStation_B_index" ON "_HardwareToStation"("B");

-- AddForeignKey
ALTER TABLE "reservation" ADD CONSTRAINT "reservation_station_id_fkey" FOREIGN KEY ("station_id") REFERENCES "station"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HardwareToStation" ADD CONSTRAINT "_HardwareToStation_A_fkey" FOREIGN KEY ("A") REFERENCES "hardware"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_HardwareToStation" ADD CONSTRAINT "_HardwareToStation_B_fkey" FOREIGN KEY ("B") REFERENCES "station"("id") ON DELETE CASCADE ON UPDATE CASCADE;
