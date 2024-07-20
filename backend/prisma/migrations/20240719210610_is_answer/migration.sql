-- AlterTable
ALTER TABLE "Question" ADD COLUMN     "is_answer" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "is_visible" SET DEFAULT true;
