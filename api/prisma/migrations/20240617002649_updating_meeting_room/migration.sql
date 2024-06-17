/*
  Warnings:

  - You are about to drop the column `identifier` on the `meeting_room` table. All the data in the column will be lost.
  - You are about to drop the column `photo` on the `meeting_room` table. All the data in the column will be lost.
  - Added the required column `capacity` to the `meeting_room` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `meeting_room_identifier_key` ON `meeting_room`;

-- AlterTable
ALTER TABLE `meeting_room` DROP COLUMN `identifier`,
    DROP COLUMN `photo`,
    ADD COLUMN `capacity` INTEGER NOT NULL;
