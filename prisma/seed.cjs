/* eslint-disable @typescript-eslint/no-require-imports */
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  const password = process.env.SEED_PASSWORD;
  if (!password || password.length < 8) {
    throw new Error('Set SEED_PASSWORD (8+ characters) before seeding.');
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const msaPath = path.join(__dirname, '..', 'docs', 'contracts', 'customers', 'fused-productions-customer-msa.md');
  const msaBody = fs.existsSync(msaPath)
    ? fs.readFileSync(msaPath, 'utf8')
    : 'Fused Productions Master Service Agreement';

  const admin = await prisma.user.upsert({
    where: { email: 'admin@fusedproductions.com' },
    update: { passwordHash, name: 'Fused Admin' },
    create: {
      email: 'admin@fusedproductions.com',
      passwordHash,
      role: 'admin',
      name: 'Fused Admin',
    },
  });

  const client = await prisma.user.upsert({
    where: { email: 'client@fusedproductions.com' },
    update: { passwordHash, name: 'Jordan Client' },
    create: {
      email: 'client@fusedproductions.com',
      passwordHash,
      role: 'client',
      name: 'Jordan Client',
    },
  });

  const vendorUser = await prisma.user.upsert({
    where: { email: 'vendor@fusedproductions.com' },
    update: { passwordHash, name: 'Alex Vendor' },
    create: {
      email: 'vendor@fusedproductions.com',
      passwordHash,
      role: 'vendor',
      name: 'Alex Vendor',
    },
  });

  const vendor = await prisma.vendor.upsert({
    where: { userId: vendorUser.id },
    update: { companyName: 'Lake Lighting Co' },
    create: {
      userId: vendorUser.id,
      companyName: 'Lake Lighting Co',
      serviceType: 'Audio/Visual',
    },
  });

  const eventDate = new Date();
  eventDate.setDate(eventDate.getDate() + 90);

  let event = await prisma.event.findFirst({ where: { clientId: client.id } });
  if (!event) {
    event = await prisma.event.create({
      data: {
        clientId: client.id,
        eventName: 'Sample gala — Northeast Ohio',
        eventDate,
        status: 'planning',
        totalContractPrice: 10000,
        venue: 'Mentor banquet hall',
        phase: 'Design Approval',
        runSheet:
          '16:00 Load-in\n17:30 Sound check\n18:30 Doors\n19:00 Dinner\n20:30 Speeches\n21:00 Dance floor\n23:00 Last call',
      },
    });

    await prisma.milestone.createMany({
      data: [
        {
          eventId: event.id,
          milestoneName: 'Initial Retainer',
          percentage: 30,
          amount: 3000,
          dueDate: new Date(),
        },
        {
          eventId: event.id,
          milestoneName: 'Planning Phase Draw',
          percentage: 40,
          amount: 4000,
          dueDate: new Date(eventDate.getTime() - 60 * 24 * 60 * 60 * 1000),
        },
        {
          eventId: event.id,
          milestoneName: 'Final Settlement',
          percentage: 30,
          amount: 3000,
          dueDate: new Date(eventDate.getTime() - 14 * 24 * 60 * 60 * 1000),
        },
      ],
    });

    await prisma.document.create({
      data: {
        eventId: event.id,
        title: 'Master Service Agreement',
        body: msaBody,
      },
    });

    await prisma.eventAssignment.create({
      data: {
        eventId: event.id,
        vendorId: vendor.id,
        loadInWindow: new Date(eventDate.getTime() - 4 * 60 * 60 * 1000),
        zoneNotes: 'Dock B. No haze without venue sign-off.',
        cueNotes: 'First dance at 20:50. Lasers after dinner clear.',
      },
    });
  }

  console.log('Seeded admin, client, vendor. Event:', event.id);
  console.log('Admin user:', admin.email);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
