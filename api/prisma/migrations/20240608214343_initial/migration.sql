-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admin" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "meeting_room" (
    "id" TEXT NOT NULL,
    "identifier" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "photo" TEXT NOT NULL,

    CONSTRAINT "meeting_room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workstation" (
    "id" TEXT NOT NULL,
    "identifier" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "screens" INTEGER NOT NULL,
    "mouse" BOOLEAN NOT NULL,
    "keyboard" BOOLEAN NOT NULL,
    "webcam" BOOLEAN NOT NULL,
    "description" TEXT NOT NULL,
    "isBlocked" BOOLEAN NOT NULL,

    CONSTRAINT "workstation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reservation" (
    "id" TEXT NOT NULL,
    "dateStart" TIMESTAMP(3) NOT NULL,
    "dateEnd" TIMESTAMP(3) NOT NULL,
    "user_id" TEXT NOT NULL,
    "workstation_id" TEXT NOT NULL,
    "meetingroom_id" TEXT NOT NULL,

    CONSTRAINT "reservation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "admin_email_key" ON "admin"("email");

-- CreateIndex
CREATE UNIQUE INDEX "meeting_room_identifier_key" ON "meeting_room"("identifier");

-- CreateIndex
CREATE UNIQUE INDEX "workstation_identifier_key" ON "workstation"("identifier");

-- AddForeignKey
ALTER TABLE "reservation" ADD CONSTRAINT "reservation_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservation" ADD CONSTRAINT "reservation_workstation_id_fkey" FOREIGN KEY ("workstation_id") REFERENCES "workstation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reservation" ADD CONSTRAINT "reservation_meetingroom_id_fkey" FOREIGN KEY ("meetingroom_id") REFERENCES "meeting_room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
