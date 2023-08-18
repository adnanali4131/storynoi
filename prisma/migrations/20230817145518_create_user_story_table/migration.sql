-- CreateTable
CREATE TABLE "Story" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Story_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Story" ADD CONSTRAINT "Story_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
