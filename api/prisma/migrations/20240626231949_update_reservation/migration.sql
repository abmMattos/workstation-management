/*
  Warnings:

  - You are about to drop the column `dateEnd` on the `reservation` table. All the data in the column will be lost.
  - You are about to drop the column `dateStart` on the `reservation` table. All the data in the column will be lost.
  - Added the required column `dateReserve` to the `reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `guests` to the `reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `motive` to the `reservation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "reservation" DROP CONSTRAINT "reservation_meetingroom_id_fkey";

-- DropForeignKey
ALTER TABLE "reservation" DROP CONSTRAINT "reservation_workstation_id_fkey";

-- AlterTable
ALTER TABLE "reservation" DROP COLUMN "dateEnd",
DROP COLUMN "dateStart",
ADD COLUMN     "dateReserve" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "guests" TEXT NOT NULL,
ADD COLUMN     "motive" TEXT NOT NULL,
ALTER COLUMN "workstation_id" DROP NOT NULL,
ALTER COLUMN "meetingroom_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "reservation" ADD CONSTRAINT "reservation_workstation_id_fkey" FOREIGN KEY ("workstation_id") REFERENCES "workstation"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservation" ADD CONSTRAINT "reservation_meetingroom_id_fkey" FOREIGN KEY ("meetingroom_id") REFERENCES "meeting_room"("id") ON DELETE SET NULL ON UPDATE CASCADE;
