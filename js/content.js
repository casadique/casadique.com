/* ================================================================
   YOUR WEBSITE CONTENT — this is the ONLY file you need to edit.
   ----------------------------------------------------------------
   • Change text between the quotes "like this".
   • To add a new video / blog / note, copy an example block,
     paste it inside the [ ], and change the details. Keep the comma between blocks.
   • Save the file, then upload it again to your hosting (see HOW-TO-UPDATE.md).
   ================================================================ */

window.SITE = {

  /* ---------------- PROFILE ---------------- */
  profile: {
    name: "CA Sadique",
    firm: "Muhammad & Associates",
    tagline: "FCA · Muhammad & Associates, Chartered Accountants",
    headline: "Clear advice on tax, audit and compliance.",
    intro: "For over 13 years I have helped individuals, NRIs, startups and businesses stay compliant and make better financial decisions. I also share free videos, articles and notes for CA students and the business community.",
    photo: "images/profile.jpg",                         // put your photo at images/profile.jpg (or leave "" to hide)

    about: `
      <p>I am a Fellow member of the Institute of Chartered Accountants of India (ICAI) and lead
      <strong>Muhammad &amp; Associates, Chartered Accountants</strong>, based in Payyanur, Kannur.</p>
      <p>Over 13 years of practice, my work has covered income tax, GST, audit and assurance,
      corporate compliance and NRI taxation for individuals, families and businesses.</p>
      <p>Alongside client work, I teach and write regularly so that students and business owners
      can understand tax and accounting in plain language.</p>
    `,

    credentials: [
      "Fellow Chartered Accountant (FCA), ICAI",
      "ICAI Membership No. 233487",
      "13 years in practice",
      "B.Com",
    ],

    stats: [
      { value: "13+", label: "Years in practice" },
      { value: "FCA", label: "Fellow member, ICAI" },
      { value: "7",   label: "Practice areas" },
    ],

    contact: {
      phone: "+91 97445 70842",
      whatsapp: "919744570842",
      email: "info@casadique.com",
      address: "3rd Floor, Grand Mall, Railway Station Road, Keloth, Payyanur, Kannur – 670 307, Kerala",
      mapLink: "https://www.google.com/maps/search/?api=1&query=Grand+Mall+Railway+Station+Road+Keloth+Payyanur+Kerala+670307",
      hours: "9:30 AM – 5:30 PM",
    },

    social: {                                            // leave "" to hide
      youtube: "https://www.youtube.com/@casadique",
      linkedin: "",
      instagram: "",
      telegram: "",
      facebook: "",
      twitter: "",
    },

    disclaimer: "The content on this website is for general information and educational purposes only and does not constitute professional advice. Please consult a qualified professional before acting on any information. This website is maintained in accordance with the guidelines of the Institute of Chartered Accountants of India.",
  },

  /* ---------------- SERVICES ---------------- */
  services: [
    { icon: "🧾", title: "Income Tax",
      description: "Return filing, tax planning and representation for individuals, firms and companies.",
      points: ["ITR filing & tax planning", "Notices, scrutiny & appeals", "TDS / TCS compliance"] },
    { icon: "🌍", title: "NRI Taxation",
      description: "Tax and compliance support for Non-Resident Indians and returning NRIs.",
      points: ["Residential status & ITR filing", "Capital gains on property sale, TDS refunds", "Form 15CA / 15CB, DTAA relief", "NRE / NRO & repatriation guidance"] },
    { icon: "📦", title: "GST",
      description: "End-to-end GST registration, returns, reconciliations and advisory.",
      points: ["Registration & monthly returns", "Annual return & reconciliation", "Notices, audits & refunds"] },
    { icon: "🔍", title: "Audit & Assurance",
      description: "Statutory, tax and internal audits carried out with independence and care.",
      points: ["Statutory audit", "Tax audit (Sec. 44AB)", "Internal & stock audits"] },
    { icon: "🏢", title: "Corporate Compliance",
      description: "Company and LLP formation and ongoing ROC compliance.",
      points: ["Company / LLP incorporation", "ROC annual filings", "Changes in directors & capital"] },
    { icon: "📊", title: "Accounting & Bookkeeping",
      description: "Reliable books, MIS reports and payroll so you always know where you stand.",
      points: ["Bookkeeping (Tally / Zoho)", "Monthly MIS", "Payroll processing"] },
    { icon: "🚀", title: "Startup Services & Advisory",
      description: "Practical guidance for startups and growing businesses.",
      points: ["Business structuring", "Startup India registration", "Project reports & loans"] },
    { icon: "🎓", title: "Accounts & Taxation Training",
      description: "Practical training for students, graduates and business staff.",
      points: ["Tally & practical accounting", "GST & income tax filing", "Guidance for CA students"] },
  ],

  /* ---------------- VIDEOS ----------------
     Paste any YouTube link (watch, youtu.be, shorts or live links all work).
     "category" creates the filter buttons automatically.

     EXAMPLE — copy this inside the [ ] below:
       { title: "GST basics for small businesses",
         url: "https://youtu.be/xxxxxxxxxxx",
         category: "Business Community",
         description: "Registration, invoicing and returns explained simply." },
  */
  videos: [
  ],

  /* ---------------- BLOGS ----------------
     Two options for each article:
       1) Write it here: give it an "id" (no spaces) and a "body" (HTML).
       2) Already published elsewhere (LinkedIn, Medium, Blogger)?
          Use  link: "https://..."  instead of a body, e.g.
            { title: "My LinkedIn article", date: "2026-11-01", category: "Income Tax",
              summary: "One line about it.", link: "https://www.linkedin.com/pulse/..." },
  */
  blogs: [
    {
      id: "gst-due-dates",
      title: "GST compliance calendar: key due dates",
      date: "2026-11-10",
      category: "GST",
      summary: "A quick reference to monthly and annual GST return due dates for regular taxpayers.",
      body: `
        <p>Missing a GST due date means late fees and interest. Here is a simple summary of the main returns.</p>
        <table>
          <tr><th>Return</th><th>Who files</th><th>Due date</th></tr>
          <tr><td>GSTR-1</td><td>Monthly filers</td><td>11th of next month</td></tr>
          <tr><td>GSTR-3B</td><td>Monthly filers</td><td>20th of next month</td></tr>
          <tr><td>GSTR-9</td><td>Annual return</td><td>31st December</td></tr>
        </table>
        <p><em>Always check the GST portal for extensions notified by the government.</em></p>
      `,
    },
    {
      id: "articleship-tips",
      title: "Making the most of your CA articleship",
      date: "2026-10-25",
      category: "CA Students",
      summary: "Practical tips to learn more, manage studies and build skills during articleship.",
      body: `
        <p>Articleship is where theory meets practice. A few suggestions:</p>
        <ul>
          <li>Ask to work on a variety of assignments — audit, tax and compliance.</li>
          <li>Keep a learning diary of every new concept you meet.</li>
          <li>Block fixed study hours each day and protect them.</li>
        </ul>
      `,
    },
  ],

  /* ---------------- NOTES & RESOURCES ----------------
     url can be:
       • a PDF you upload into the "notes" folder, e.g.  "notes/gst-summary.pdf"
       • a Google Drive link (set sharing to "Anyone with the link") — add type: "PDF"

     EXAMPLE — copy this inside the [ ] below:
       { title: "GST quick revision notes",
         url: "https://drive.google.com/file/d/xxxx/view",
         type: "PDF",
         category: "CA Students",
         description: "CA Inter • 12 pages" },
  */
  notes: [
  ],
};
