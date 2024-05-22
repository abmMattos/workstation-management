-- CreateTable
CREATE TABLE `user` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `user_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `admin` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `admin_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `meeting_room` (
    `id` VARCHAR(191) NOT NULL,
    `identifier` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `photo` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `workstation` (
    `id` VARCHAR(191) NOT NULL,
    `identifier` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `screens` INTEGER NOT NULL,
    `mouse` BOOLEAN NOT NULL,
    `keyboard` BOOLEAN NOT NULL,
    `webcam` BOOLEAN NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `isBlocked` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reservation` (
    `id` VARCHAR(191) NOT NULL,
    `dateStart` DATETIME(3) NOT NULL,
    `dateEnd` DATETIME(3) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `workstation_id` VARCHAR(191) NOT NULL,
    `meetingroom_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `reservation` ADD CONSTRAINT `reservation_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reservation` ADD CONSTRAINT `reservation_workstation_id_fkey` FOREIGN KEY (`workstation_id`) REFERENCES `workstation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `reservation` ADD CONSTRAINT `reservation_meetingroom_id_fkey` FOREIGN KEY (`meetingroom_id`) REFERENCES `meeting_room`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
