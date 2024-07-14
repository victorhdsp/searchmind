-- CreateTable
CREATE TABLE "Config" (
    "user_uid" TEXT NOT NULL,
    "uid" TEXT NOT NULL,
    "question_hours" TEXT[] DEFAULT ARRAY[]::TEXT[],

    CONSTRAINT "Config_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "Question" (
    "user_uid" TEXT NOT NULL,
    "uid" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "words" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "is_visible" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Question_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "Response" (
    "question_uid" TEXT NOT NULL,
    "user_uid" TEXT NOT NULL,
    "uid" TEXT NOT NULL,
    "words" TEXT[],
    "hit_rate" INTEGER NOT NULL,

    CONSTRAINT "Response_pkey" PRIMARY KEY ("uid")
);

-- CreateTable
CREATE TABLE "User" (
    "uid" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("uid")
);

-- CreateIndex
CREATE UNIQUE INDEX "Config_user_uid_key" ON "Config"("user_uid");

-- CreateIndex
CREATE UNIQUE INDEX "Response_question_uid_key" ON "Response"("question_uid");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Config" ADD CONSTRAINT "Config_user_uid_fkey" FOREIGN KEY ("user_uid") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_user_uid_fkey" FOREIGN KEY ("user_uid") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_question_uid_fkey" FOREIGN KEY ("question_uid") REFERENCES "Question"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_user_uid_fkey" FOREIGN KEY ("user_uid") REFERENCES "User"("uid") ON DELETE RESTRICT ON UPDATE CASCADE;
