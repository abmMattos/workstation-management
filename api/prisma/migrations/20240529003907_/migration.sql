/*
  Warnings:

  - A unique constraint covering the columns `[identifier]` on the table `meeting_room` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[identifier]` on the table `workstation` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `meeting_room_identifier_key` ON `meeting_room`(`identifier`);

-- CreateIndex
CREATE UNIQUE INDEX `workstation_identifier_key` ON `workstation`(`identifier`);
