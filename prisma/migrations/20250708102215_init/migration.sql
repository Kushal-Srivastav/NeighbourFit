-- CreateTable
CREATE TABLE "Neighborhood" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "population" INTEGER NOT NULL,
    "medianIncome" DOUBLE PRECISION NOT NULL,
    "crimeRate" DOUBLE PRECISION NOT NULL,
    "walkScore" INTEGER NOT NULL,
    "transitScore" INTEGER NOT NULL,
    "bikeScore" INTEGER NOT NULL,
    "amenities" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Neighborhood_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserPreference" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "budget" INTEGER NOT NULL,
    "commuteTime" INTEGER NOT NULL,
    "amenities" TEXT NOT NULL,
    "safetyWeight" DOUBLE PRECISION NOT NULL,
    "commuteWeight" DOUBLE PRECISION NOT NULL,
    "amenitiesWeight" DOUBLE PRECISION NOT NULL,
    "walkabilityWeight" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserPreference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Match" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "neighborhoodId" INTEGER NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "categoryRatings" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "neighborhoodId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserPreference_userId_key" ON "UserPreference"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Match_userId_neighborhoodId_key" ON "Match"("userId", "neighborhoodId");

-- AddForeignKey
ALTER TABLE "UserPreference" ADD CONSTRAINT "UserPreference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_neighborhoodId_fkey" FOREIGN KEY ("neighborhoodId") REFERENCES "Neighborhood"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_neighborhoodId_fkey" FOREIGN KEY ("neighborhoodId") REFERENCES "Neighborhood"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
