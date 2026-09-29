window.WEPL_TNC = {
  "company": "Winner Engineering Pte Ltd",
  "employees": [
    {
      "name": "Karunakaran Suresh",
      "id": "S0063",
      "role": "Project Executive",
      "email": "Suresh@winner-e.sg"
    },
    {
      "name": "Mathiyalagan Dinesh",
      "id": "W0038",
      "role": "Site Supervisor",
      "email": "Mathiyalagan.Dinesh@winner-e.sg"
    },
    {
      "name": "Palanivel Lawrence",
      "id": "W0060",
      "role": "Foreman",
      "email": "lawrencepuvi@gmail.com"
    },
    {
      "name": "Tin Lin Aung",
      "id": "W0127",
      "role": "Assistant Foreman",
      "email": "htinlina63@gmail.com"
    },
    {
      "name": "Kyaw Paing Phyo",
      "id": "W0113",
      "role": "Skilled Worker",
      "email": "kyawpaing.ptn@gmail.com"
    },
    {
      "name": "Rajendran Raghu",
      "id": "W0064",
      "role": "Assistant Foreman",
      "email": "613103vkm@gmail.com"
    },
    {
      "name": "Zaw Lat",
      "id": "W0105",
      "role": "Assistant Foreman",
      "email": "zawlatt191980@gmail.com"
    },
    {
      "name": "Rajalingam Ramki",
      "id": "W0169",
      "role": "Skilled Worker",
      "email": "ramkirajalingamramki@gmail.com"
    },
    {
      "name": "Rasu Gunasekaran",
      "id": "W0183",
      "role": "General Worker",
      "email": "rasugunasekaran93@gmail.com"
    },
    {
      "name": "Ezhumalai Muhesh",
      "id": "W0179",
      "role": "Skilled Worker",
      "email": "mugeshthala25@gmail.com"
    },
    {
      "name": "Arikrishnan Paramaguru",
      "id": "W0210",
      "role": "General Worker",
      "email": "guruashwin2021@gmail.com"
    },
    {
      "name": "Velmurugan Subash",
      "id": "W0211",
      "role": "General Worker",
      "email": "subashmccullum@gmail.com"
    },
    {
      "name": "Vijayakumar Mahesh",
      "id": "S0182",
      "role": "Site Coordinator",
      "email": "vijayakumar.mahesh@winner-e.sg"
    },
    {
      "name": "Brian Ng",
      "id": "S0054",
      "role": "Assistant Project Manager",
      "email": "brian.ng@winner-e.sg"
    }
  ],
  "roles": [
    "Technician",
    "Site Supervisor",
    "Project Site Coordinator",
    "Project Manager",
    "Client / RTO / FM"
  ],
  "tracks": [
    {
      "id": "precon",
      "name": "Pre-Construction Survey Workflow",
      "short": "Pre-Construction",
      "stages": [
        {
          "id": "proj-docs",
          "n": 0,
          "title": "Project Documents",
          "hint": "Project file library — not a workflow stage. Create folders and upload drawings, reports and supporting files. Attach these files to any stage, or extract equipment data from Excel / PDF / CSV as required.",
          "kind": "projdocs",
          "standalone": true,
          "accept": ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.csv,.txt,.rtf,.zip,image/*",
          "skippable": false
        },
        {
          "id": "pc-cf",
          "n": 1,
          "loop": 1,
          "loopTitle": "Pre-Con Testing & Verification",
          "loopHint": "Complete pre-construction checks for the selected equipment: client forms, survey checklist, operation data, airflow report, drawings, photos, BMS graphics, calibration, then Review (Tested By).",
          "subTitle": "Client Inspection Forms",
          "title": "Client Inspection Forms",
          "hint": "Upload one or more client inspection forms for this equipment. Each file stays on this equipment only.",
          "kind": "uploads",
          "accept": ".pdf,image/*",
          "skippable": true
        },
        {
          "id": "pc-1",
          "n": 1,
          "loop": 1,
          "loopTitle": "Pre-Con Testing & Verification",
          "subTitle": "Pre-Construction Survey Checklist",
          "title": "Pre-Construction Survey Checklist",
          "hint": "Select the survey checklist for this equipment. Yes, No and N/A are one choice per row.",
          "kind": "docs",
          "docGroup": "preconChecklists",
          "skippable": true
        },
        {
          "id": "pc-2",
          "n": 1,
          "loop": 1,
          "loopTitle": "Pre-Con Testing & Verification",
          "subTitle": "Test Report (Operation Data Forms)",
          "title": "Test Report (Operation Data Forms)",
          "hint": "Search and fill Operation Data forms for this pre-construction package. These records stay separate from the T&C Checklist & Airflow Report workflow.",
          "kind": "docs",
          "docGroup": "filledReports",
          "skippable": true
        },
        {
          "id": "pc-air",
          "n": 1,
          "loop": 1,
          "loopTitle": "Pre-Con Testing & Verification",
          "subTitle": "Airflow Balancing Test Report",
          "title": "Airflow Balancing Test Report",
          "hint": "Search and fill airflow balancing sheets for this pre-construction package. T&C airflow records are not changed.",
          "kind": "docs",
          "docGroup": "airflowReports",
          "skippable": true
        },
        {
          "id": "pc-3",
          "n": 1,
          "loop": 1,
          "loopTitle": "Pre-Con Testing & Verification",
          "subTitle": "Project Plan Drawing & Equipment Schedule",
          "title": "Project Plan Drawing & Equipment Schedule",
          "hint": "Upload the plan drawing and equipment schedule PDFs. Zoom, pan and annotate. Files stay with this equipment stage.",
          "kind": "drawings",
          "accept": ".pdf",
          "skippable": true
        },
        {
          "id": "pc-4",
          "n": 1,
          "loop": 1,
          "loopTitle": "Pre-Con Testing & Verification",
          "subTitle": "Pre-Construction Survey Photos",
          "title": "Pre-Construction Survey Photos",
          "hint": "4 photos per A4 page. Add pages, take or upload photos, annotate, and rephrase descriptions. Comments auto-save.",
          "kind": "photos",
          "accept": "image/*",
          "skippable": true
        },
        {
          "id": "pc-5",
          "n": 1,
          "loop": 1,
          "loopTitle": "Pre-Con Testing & Verification",
          "subTitle": "BMS Graphic Photos",
          "title": "BMS Graphic Photos",
          "hint": "Same photo sheet as the survey photos. Use it for BMS graphics and screenshots. Stored separately from survey photos.",
          "kind": "photos",
          "accept": "image/*",
          "skippable": true
        },
        {
          "id": "pc-6",
          "n": 1,
          "loop": 1,
          "loopTitle": "Pre-Con Testing & Verification",
          "subTitle": "Instrument Calibration Certificate",
          "title": "Instrument Calibration Certificate",
          "hint": "Select calibration certificates for this equipment package.",
          "kind": "docs",
          "docGroup": "calibration",
          "accept": ".pdf,image/*",
          "skippable": true
        },
        {
          "id": "pc-7",
          "n": 1,
          "loop": 1,
          "loopTitle": "Pre-Con Testing & Verification",
          "subTitle": "Review (Tested By)",
          "title": "Review (Tested By)",
          "hint": "Confirm Stage 1 modules are completed or skipped, then submit this equipment to the Pre-Con Test Report.",
          "kind": "preconreview",
          "skippable": false
        },
        {
          "id": "pc-report",
          "n": 2,
          "loop": 2,
          "loopTitle": "Pre-Con Test Report",
          "title": "Pre-Con Test Report",
          "hint": "Merged equipment moves here, then on to Witness Review. The merged PDF stays with the equipment.",
          "kind": "preconreport",
          "skippable": false
        },
        {
          "id": "pc-witness",
          "n": 3,
          "loop": 3,
          "loopTitle": "Witness Review",
          "title": "Witness Review",
          "hint": "Witness acknowledges this equipment or returns it with a comment. Previous history is kept.",
          "kind": "preconwitness",
          "skippable": false
        },
        {
          "id": "pc-client",
          "n": 4,
          "loop": 4,
          "loopTitle": "Client / RTO / FM Verification",
          "title": "Client / RTO / FM Verification",
          "hint": "Client, RTO or FM signs this equipment. Approval files the merged PDF under Project Documents → Approved Pre-Construction Reports → Level.",
          "kind": "preconclient",
          "skippable": false
        }
      ]
    },
    {
      "id": "airflow",
      "name": "T&C Check List & Airflow Report Workflow",
      "short": "T&C Check List & Airflow Report",
      "stages": [
        {
          "id": "af-docs",
          "n": 0,
          "title": "Project Documents",
          "hint": "Main source folder — not a workflow stage. Upload files or folders, create folders, and keep project files here. Any required document on a workflow page can be extracted from this library. The original file stays in Project Documents.",
          "kind": "projdocs",
          "standalone": true,
          "accept": ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.csv,.txt,.rtf,.zip,image/*",
          "skippable": false
        },
        {
          "id": "af-2",
          "n": 1,
          "loop": 1,
          "loopTitle": "Field Testing & Verification",
          "loopHint": "Complete field testing for the selected equipment unit: inspection forms, checklist, operation data, airflow balancing test report, drawings, calibration, photos, then Review (Tested By).",
          "subTitle": "Client Inspection Forms",
          "title": "Client Inspection Forms",
          "hint": "Choose a company from the dropdown to open that company's saved inspection forms. Click Upload files, enter Company Name and Type of Inspection Form, then Select File (PDF or Word).",
          "kind": "clientforms",
          "accept": ".pdf",
          "skippable": true
        },
        {
          "id": "af-1",
          "n": 1,
          "loop": 1,
          "loopTitle": "Field Testing & Verification",
          "subTitle": "T&C Checklist",
          "title": "T&C Checklist",
          "hint": "Search and select the required checklist. Only the matching checklist is shown for completion. Skip only with a reason (visible to Admin / Tested By).",
          "kind": "docs",
          "docGroup": "preChecklists",
          "skippable": true
        },
        {
          "id": "af-3",
          "n": 1,
          "loop": 1,
          "loopTitle": "Field Testing & Verification",
          "subTitle": "Test Report (Operation Data Forms)",
          "title": "Test Report (Operation Data Forms)",
          "hint": "Type in the box to search, then select a master Operation Data (Test Report) template. Air balancing / grille velocity sheets are under Airflow Balancing Test Report. Equipment-specific drafts appear under Review (Tested By).",
          "kind": "docs",
          "docGroup": "filledReports",
          "skippable": false
        },
        {
          "id": "af-airflow",
          "n": 1,
          "loop": 1,
          "loopTitle": "Field Testing & Verification",
          "subTitle": "Airflow Balancing Test Report",
          "title": "Airflow Balancing Test Report",
          "hint": "Type in the box to search Airflow Balancing & Airflow Velocity test sheets (grille/diffuser measurement, duct traverse, air balancing). Enter measured CFM/CMH, grille sizes and velocity on the web form.",
          "kind": "docs",
          "docGroup": "airflowReports",
          "skippable": true
        },
        {
          "id": "af-4",
          "n": 1,
          "loop": 1,
          "loopTitle": "Field Testing & Verification",
          "subTitle": "Project Plan Drawing & Equipment Schedule",
          "title": "Project Plan Drawing & Equipment Schedule",
          "hint": "Upload the project plan drawing and equipment schedule (PDF). Drawings open in landscape with Fit page so plans and schedules stay readable. Use Zoom, Fit width/page, Pan and Full screen. Write text on the page, highlight, draw, erase and undo — annotations auto-save.",
          "kind": "drawings",
          "accept": ".pdf",
          "skippable": false
        },
        {
          "id": "af-5",
          "n": 1,
          "loop": 1,
          "loopTitle": "Field Testing & Verification",
          "subTitle": "Instrument Calibration Certificate",
          "title": "Instrument Calibration Certificate",
          "hint": "Search and select a calibration certificate folder, then choose and upload the required certificate.",
          "kind": "docs",
          "docGroup": "calibration",
          "accept": ".pdf,image/*",
          "skippable": false
        },
        {
          "id": "af-6",
          "n": 1,
          "loop": 1,
          "loopTitle": "Field Testing & Verification",
          "subTitle": "Site Inspection Photos",
          "title": "Site Inspection Photos",
          "hint": "4 photos per A4 page. Use Add Page for more sheets. Camera/Upload photos, annotate with Arrow, Text, Pan and Freehand. Description and Comments auto-save. Use Rephrase on Description when needed.",
          "kind": "photos",
          "accept": "image/*",
          "skippable": false
        },
        {
          "id": "af-7",
          "n": 1,
          "loop": 1,
          "loopTitle": "Field Testing & Verification",
          "subTitle": "Review (Tested By)",
          "title": "Review (Tested By)",
          "hint": "Merge field documents for the selected equipment into one ACMV Testing Commissioning Report. Equipment drafts appear here for Tested By to select, preview, edit or merge. After Merge the button turns green.",
          "kind": "merge",
          "skippable": false
        },
        {
          "id": "af-internal",
          "n": 2,
          "loop": 2,
          "loopTitle": "Internal Test Report",
          "title": "Internal Test Report",
          "hint": "Upload internal test reports (PDF or Word) for the selected equipment. Completing this step advances that unit to Witness Review.",
          "kind": "uploads",
          "accept": ".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "skippable": true
        },
        {
          "id": "af-9",
          "n": 3,
          "loop": 3,
          "loopTitle": "Witness Review",
          "title": "Witness Review",
          "hint": "Witness acknowledges the selected equipment package. Any one Admin-assigned Witness (Site Coordinator, Site Engineer, or Site Project Manager) selects their role and acknowledges.",
          "kind": "witness",
          "skippable": false
        },
        {
          "id": "af-10",
          "n": 4,
          "loop": 4,
          "loopTitle": "Final Review & Approval",
          "title": "Final Review & Approval",
          "hint": "Verify By roles acknowledge the selected equipment in sequence. Completing this stage closes that unit’s cycle and updates equipment progress on the dashboard.",
          "kind": "verify",
          "skippable": false
        },
        {
          "id": "af-date",
          "n": 5,
          "loop": 5,
          "loopTitle": "Final T&C Inspection",
          "title": "Final T&C Inspection",
          "hint": "Only equipment with Final Review & Approval = Approved appears here. Use View to annotate / e-sign, then Completed. Confirm to archive under Project Documents → Approved Test Report → Level → Equipment, or choose Re-Test to return the unit for revision with full audit history.",
          "kind": "finalinsp",
          "skippable": false
        }
      ]
    }
  ],
  "preChecklists": [
    {
      "id": "pt-01",
      "formNo": "PT/CHECKLIST ACMV-01",
      "title": "WATER COOLED CHILLED PRE TEST CHECK LIST",
      "itemKey": "water-chiller",
      "libKey": "pre-checklist",
      "libIndex": 0,
      "kind": "checklist"
    },
    {
      "id": "pt-02",
      "formNo": "PT/CHECKLIST ACMV-02",
      "title": "COOLING TOWER PRE TEST CHECK LIST",
      "itemKey": "cooling-tower",
      "libKey": "pre-checklist",
      "libIndex": 1,
      "kind": "checklist"
    },
    {
      "id": "pt-03",
      "formNo": "PT/CHECKLIST ACMV-03",
      "title": "PUMP PRE TEST CHECK LIST",
      "itemKey": "pump",
      "libKey": "pre-checklist",
      "libIndex": 2,
      "kind": "checklist"
    },
    {
      "id": "pt-04",
      "formNo": "PT/CHECKLIST ACMV-04",
      "title": "CHILLED AHU/PAHU PRE TEST CHECK LIST",
      "itemKey": "chilled-ahu",
      "libKey": "pre-checklist",
      "libIndex": 3,
      "kind": "checklist"
    },
    {
      "id": "pt-05",
      "formNo": "PT/CHECKLIST ACMV-05",
      "title": "CHILLED FCU PRE TEST CHECK LIST",
      "itemKey": "chilled-fcu",
      "libKey": "pre-checklist",
      "libIndex": 4,
      "kind": "checklist"
    },
    {
      "id": "pt-06",
      "formNo": "PT/CHECKLIST ACMV-06",
      "title": "MECHANICAL FAN PRE-TEST CHECK LIST",
      "itemKey": "mv-fan",
      "libKey": "pre-checklist",
      "libIndex": 5,
      "kind": "checklist"
    },
    {
      "id": "pt-07",
      "formNo": "PT/CHECKLIST ACMV-07",
      "title": "AHU VRF PRE-TEST CHECK LIST",
      "itemKey": "ahu-vrf",
      "libKey": "pre-checklist",
      "libIndex": 6,
      "kind": "checklist"
    },
    {
      "id": "pt-08",
      "formNo": "PT/CHECKLIST ACMV-08",
      "title": "FCU VRF PRE-TEST CHECK LIST",
      "itemKey": "fcu-vrf",
      "libKey": "pre-checklist",
      "libIndex": 7,
      "kind": "checklist"
    },
    {
      "id": "pt-09",
      "formNo": "PT/CHECKLIST ACMV-09",
      "title": "VARIABLE SPEED DRIVE PRE-TEST CHECK LIST",
      "itemKey": "vsd",
      "libKey": "pre-checklist",
      "libIndex": 8,
      "kind": "checklist"
    },
    {
      "id": "pt-10",
      "formNo": "PT/CHECKLIST ACMV-10",
      "title": "PIPE FLUSHING TEST CHECK LIST",
      "itemKey": "pipe-flush",
      "libKey": "pre-checklist",
      "libIndex": 9,
      "kind": "checklist"
    },
    {
      "id": "pt-11",
      "formNo": "PT/CHECKLIST ACMV-11",
      "title": "DUCT LEAK TEST CHECK LIST",
      "itemKey": "duct-leak",
      "libKey": "pre-checklist",
      "libIndex": 10,
      "kind": "checklist"
    },
    {
      "id": "pt-12",
      "formNo": "PT/CHECKLIST ACMV-12",
      "title": "BMS (MV) PRE-TEST CHECK LIST",
      "itemKey": "bms-mv",
      "libKey": "pre-checklist",
      "libIndex": 11,
      "kind": "checklist"
    },
    {
      "id": "pt-13",
      "formNo": "PT/CHECKLIST ACMV-13",
      "title": "BMS (AC) PRE-TEST CHECK LIST",
      "itemKey": "bms-ac",
      "libKey": "pre-checklist",
      "libIndex": 12,
      "kind": "checklist"
    }
  ],
  "preconChecklists": [
    {
      "id": "pcl-01",
      "formNo": "AHU/FCU-PCL-01",
      "title": "Chilled AHU/FCU PRE-CON CHECK LIST",
      "itemKey": "ahu-fcu-pcl",
      "libKey": "precon",
      "libIndex": 0,
      "kind": "precon"
    },
    {
      "id": "pcl-02",
      "formNo": "MVF-PCL-02",
      "title": "MECHANICAL FAN PRE-CON CHECK LIST",
      "itemKey": "mvf-pcl",
      "libKey": "precon",
      "libIndex": 1,
      "kind": "precon"
    },
    {
      "id": "pcl-03",
      "formNo": "VRF-PCL-03",
      "title": "SPLIT UNIT/VRF PRE-CON CHECK LIST",
      "itemKey": "vrf-pcl",
      "libKey": "precon",
      "libIndex": 2,
      "kind": "precon"
    }
  ],
  "filledReports": [
    {
      "id": "ftc-01",
      "formNo": "FTC-01/R0",
      "title": "OPERATION DATAS FOR AHU SYSTEM REPORT FORM",
      "libKey": "test-reports",
      "libIndex": 0,
      "kind": "report"
    },
    {
      "id": "ftc-02",
      "formNo": "FTC-02/R0",
      "title": "OPERATION DATAS FOR FCU SYSTEM REPORT FORM",
      "libKey": "test-reports",
      "libIndex": 1,
      "kind": "report"
    },
    {
      "id": "ftc-03",
      "formNo": "FTC-03/R0",
      "title": "OPERATION DATAS FOR MV FANS REPORT FORM",
      "libKey": "test-reports",
      "libIndex": 2,
      "kind": "report"
    },
    {
      "id": "ftc-04",
      "formNo": "FTC-04/R0",
      "title": "OPERATION DATAS FOR AIR COOLED CHILLER REPORT FORM",
      "libKey": "test-reports",
      "libIndex": 3,
      "kind": "report"
    },
    {
      "id": "ftc-05",
      "formNo": "FTC-05/R0",
      "title": "OPERATION DATAS FOR WATER COOLED CHILLER REPORT FORM",
      "libKey": "test-reports",
      "libIndex": 4,
      "kind": "report"
    },
    {
      "id": "ftc-06",
      "formNo": "FTC-06/R0",
      "title": "OPERATION DATAS FOR WATER COOLED PACKAGED UNIT REPORT FORM",
      "libKey": "test-reports",
      "libIndex": 5,
      "kind": "report"
    },
    {
      "id": "ftc-07",
      "formNo": "FTC-07/R0",
      "title": "OPERATION DATAS FOR COOLING TOWER SYSTEM REPORT FORM",
      "libKey": "test-reports",
      "libIndex": 6,
      "kind": "report"
    },
    {
      "id": "ftc-08",
      "formNo": "FTC-08/R0",
      "title": "OPERATION DATAS FOR PUMPS REPORT FORM",
      "libKey": "test-reports",
      "libIndex": 7,
      "kind": "report"
    },
    {
      "id": "ftc-09",
      "formNo": "FTC-09/R0",
      "title": "OPERATION DATAS FOR CONDENSER AIRCON UNIT REPORT FORM (VRV/SPLIT UNITS)",
      "libKey": "test-reports",
      "libIndex": 8,
      "kind": "report"
    },
    {
      "id": "ftc-11",
      "formNo": "FTC-11/R0",
      "title": "TEMPERATURE & RELATIVE HUMIDITY TEST REPORT FORM",
      "libKey": "test-reports",
      "libIndex": 10,
      "kind": "report"
    },
    {
      "id": "ftc-12",
      "formNo": "FTC-12/R0",
      "title": "NOISE LEVEL MEASUREMENT REPORT FORM",
      "libKey": "test-reports",
      "libIndex": 11,
      "kind": "report"
    },
    {
      "id": "ftc-14",
      "formNo": "FTC-14/R0",
      "title": "PIPE HYDROSTATIC PRESSURE TEST REPORT FORM",
      "libKey": "test-reports",
      "libIndex": 13,
      "kind": "report"
    },
    {
      "id": "ftc-15",
      "formNo": "FTC-15/R0",
      "title": "TEMPERATURE MEASUREMENT TEST REPORT FORM",
      "libKey": "test-reports",
      "libIndex": 14,
      "kind": "report"
    },
    {
      "id": "ftc-16",
      "formNo": "FTC-16/R0",
      "title": "DUCT LEAKAGE TEST REPORT FORM",
      "libKey": "test-reports",
      "libIndex": 15,
      "kind": "report"
    },
    {
      "id": "ftc-18",
      "formNo": "FTC-18/R0",
      "title": "MEGGER TEST REPORT FORM",
      "libKey": "test-reports",
      "libIndex": 18,
      "kind": "report"
    },
    {
      "id": "ftc-19",
      "formNo": "FTC-19/R0",
      "title": "STAIRCASE PRESSURIZATION TEST REPORT FORM",
      "libKey": "test-reports",
      "libIndex": 19,
      "kind": "report"
    },
    {
      "id": "ftc-20",
      "formNo": "FTC-20/R0",
      "title": "ROOM RELATIVE HUMIDITY & TEMPERATURE & NOISE REPORT",
      "libKey": "test-reports",
      "libIndex": 20,
      "kind": "report"
    },
    {
      "id": "ftc-24",
      "formNo": "FTC-24/R0",
      "title": "POSITIVE & NEGATIVE PRESSURE ISOLATION ROOM PERFORMANCE VERIFICATION",
      "libKey": "test-reports",
      "libIndex": 24,
      "kind": "report"
    }
  ],
  "airflowReports": [
    {
      "id": "ftc-10",
      "formNo": "FTC-10/R0",
      "title": "AIR BALANCING TEST REPORT FORM",
      "libKey": "test-reports",
      "libIndex": 9,
      "kind": "report"
    },
    {
      "id": "ftc-10a",
      "formNo": "FTC-10A/R0",
      "title": "AIR BALANCING TEST REPORT FORM (MV FAN)",
      "libKey": "test-reports",
      "libIndex": 9,
      "kind": "report"
    },
    {
      "id": "ftc-13",
      "formNo": "FTC-13/R0",
      "title": "AIR BALANCING TEST REPORT FORM (VAV,VV)",
      "libKey": "test-reports",
      "libIndex": 12,
      "kind": "report"
    },
    {
      "id": "ftc-17",
      "formNo": "FTC-17/R0",
      "title": "AIR BALANCING TEST REPORT FORM (CAV)",
      "libKey": "test-reports",
      "libIndex": 16,
      "kind": "report"
    },
    {
      "id": "ftc-17a",
      "formNo": "FTC-17A/R0",
      "title": "AIR BALANCING TEST REPORT FORM (FCU / AHU)",
      "libKey": "test-reports",
      "libIndex": 17,
      "kind": "report"
    },
    {
      "id": "ftc-21",
      "formNo": "FTC-21/R0",
      "title": "GRILLE & LOUVER TEST REPORT FORM",
      "libKey": "test-reports",
      "libIndex": 21,
      "kind": "report"
    },
    {
      "id": "ftc-22",
      "formNo": "FTC-22/R0",
      "title": "VAV BOX FUNCTIONAL AIR BALANCING TEST FORM (BMS)",
      "libKey": "test-reports",
      "libIndex": 22,
      "kind": "report"
    },
    {
      "id": "ftc-23",
      "formNo": "FTC-23/R0",
      "title": "AIR BALANCING FIELD TEST REPORT FORM",
      "libKey": "test-reports",
      "libIndex": 23,
      "kind": "report"
    }
  ],
  "items": {
    "water-chiller": [
      {
        "no": "1",
        "section": "General",
        "text": "Check that the equipment is clean, free of debris, and undamaged before commencing operations."
      },
      {
        "no": "2",
        "section": "Documents",
        "text": "Verify chiller tag, make, model, serial number, refrigerant and rated capacity."
      },
      {
        "no": "3",
        "section": "Documents",
        "text": "Verify approved CHW/CW schematics, plant sequence and manufacturer startup checklist."
      },
      {
        "no": "4",
        "section": "Installation",
        "text": "Check unit condition, supports, level, anchors, vibration isolation and service access."
      },
      {
        "no": "5",
        "section": "Installation",
        "text": "Check plant-room ventilation, access and specified refrigerant safety systems."
      },
      {
        "no": "6",
        "section": "CHW piping",
        "text": "Check evaporator connections, pipe sizing, routing, supports and flow direction."
      },
      {
        "no": "7",
        "section": "CW piping",
        "text": "Check condenser connections, pipe sizing, routing, supports and flow direction."
      },
      {
        "no": "8",
        "section": "Valves",
        "text": "Check isolation, balancing, bypass, check and motorized valve installation."
      },
      {
        "no": "9",
        "section": "Strainers",
        "text": "Check CHW and CW strainers, access and cleaning records."
      },
      {
        "no": "10",
        "section": "Water quality",
        "text": "Review CHW/CW pressure-test and flushing records."
      },
      {
        "no": "11",
        "section": "Water quality",
        "text": "Confirm systems filled, vented and treated; verify glycol concentration where specified."
      },
      {
        "no": "12",
        "section": "CHW system",
        "text": "Verify expansion vessel, pressurization/makeup system and system pressure."
      },
      {
        "no": "13",
        "section": "Vents & drains",
        "text": "Check evaporator/condenser vents and drain connections."
      },
      {
        "no": "14",
        "section": "Instrumentation",
        "text": "Verify thermometers, pressure gauges, flow meters and test points."
      },
      {
        "no": "15",
        "section": "Flow protection",
        "text": "Check CHW and CW flow-switch/flow-proof installation and settings."
      },
      {
        "no": "16",
        "section": "Insulation",
        "text": "Check evaporator/CHW insulation and vapour barriers where specified."
      },
      {
        "no": "17",
        "section": "Plant readiness",
        "text": "Confirm CHW and CW pumps are commissioned and required flow can be established."
      },
      {
        "no": "18",
        "section": "Plant readiness",
        "text": "Confirm cooling tower readiness, makeup supply and water treatment."
      },
      {
        "no": "19",
        "section": "Refrigerant",
        "text": "Verify refrigerant circuit condition, charge/leak-check records and relief arrangements with manufacturer."
      },
      {
        "no": "20",
        "section": "Lubrication",
        "text": "Verify compressor oil system, oil level and oil-pump readiness where applicable."
      },
      {
        "no": "21",
        "section": "Heaters",
        "text": "Verify oil/sump heater supply and required pre-energization time where fitted."
      },
      {
        "no": "22",
        "section": "Starter / drive",
        "text": "Check starter/VSD installation, cooling, cleanliness and parameters where fitted."
      },
      {
        "no": "23",
        "section": "Initial settings",
        "text": "Verify local control switch initial position and unit interface orientation/access."
      },
      {
        "no": "24",
        "section": "Test load",
        "text": "Confirm required cooling load and test conditions are available."
      },
      {
        "no": "25",
        "section": "Electrical",
        "text": "Verify panel, isolator, breaker and motor-protection ratings/settings."
      },
      {
        "no": "26",
        "section": "Electrical",
        "text": "Check cable insulation, glands, terminations and circuit identification with power isolated."
      },
      {
        "no": "27",
        "section": "Electrical",
        "text": "Verify protective earth and applicable protection test records."
      },
      {
        "no": "28",
        "section": "Controls",
        "text": "Check interlock, remote-control and BMS wiring and point identification."
      }
    ],
    "cooling-tower": [
      {
        "no": "1",
        "section": "Documents",
        "text": "Verify tower/cell tag, make, model, serial number and approved design duty."
      },
      {
        "no": "2",
        "section": "Access",
        "text": "Check service access, platforms, ladders, guarding and access doors."
      },
      {
        "no": "3",
        "section": "Structure",
        "text": "Check tower base, anchors, bolts/nuts and supporting structure."
      },
      {
        "no": "4",
        "section": "Structure",
        "text": "Check casing panels, cross braces and joints."
      },
      {
        "no": "5",
        "section": "Internals",
        "text": "Check fill blocks and supports."
      },
      {
        "no": "6",
        "section": "Internals",
        "text": "Check drift eliminators and air-inlet louvers."
      },
      {
        "no": "7",
        "section": "Water distribution",
        "text": "Check distribution piping, spray nozzles or hot-water distribution basin."
      },
      {
        "no": "8",
        "section": "Basin",
        "text": "Check cold-water basin, outlet screen/strainer and accessible sump."
      },
      {
        "no": "9",
        "section": "Hygiene",
        "text": "Review tower cleaning, disinfection and water-treatment startup records."
      },
      {
        "no": "10",
        "section": "Pipework",
        "text": "Check CW flow/return and equalizer piping where fitted."
      },
      {
        "no": "11",
        "section": "Valves",
        "text": "Check isolation, balancing, check and motorized valves where fitted."
      },
      {
        "no": "12",
        "section": "Makeup",
        "text": "Check makeup-water supply, float/level valve and backflow protection as specified."
      },
      {
        "no": "13",
        "section": "Drainage",
        "text": "Check overflow, drain and bleed-off/blowdown connections."
      },
      {
        "no": "14",
        "section": "Level controls",
        "text": "Check basin low/high-level sensors and identification."
      },
      {
        "no": "15",
        "section": "Water treatment",
        "text": "Check dosing, conductivity measurement, sample points and controller installation where specified."
      },
      {
        "no": "16",
        "section": "Fan",
        "text": "Check fan blades, hub, fixings and blade pitch where adjustable."
      },
      {
        "no": "17",
        "section": "Fan",
        "text": "Check fan-to-cylinder clearance and free rotation with power isolated."
      },
      {
        "no": "18",
        "section": "Drive",
        "text": "Check pulley alignment, belt condition/tension and guards if belt-driven."
      },
      {
        "no": "19",
        "section": "Drive",
        "text": "Check gearbox/coupling, bearings and lubrication where fitted."
      },
      {
        "no": "20",
        "section": "Vibration",
        "text": "Check motor/fan supports, isolators and vibration switch where fitted."
      },
      {
        "no": "21",
        "section": "Instrumentation",
        "text": "Check entering/leaving water-temperature sensors and flow measurement provisions."
      },
      {
        "no": "22",
        "section": "Drive controls",
        "text": "Check starter/VSD parameters and speed restrictions where fitted."
      },
      {
        "no": "23",
        "section": "Electrical",
        "text": "Verify panel, isolator, breaker and motor-protection ratings/settings."
      },
      {
        "no": "24",
        "section": "Electrical",
        "text": "Check cable insulation, glands, terminations and circuit identification with power isolated."
      },
      {
        "no": "25",
        "section": "Electrical",
        "text": "Verify protective earth and applicable protection test records."
      },
      {
        "no": "26",
        "section": "Controls",
        "text": "Check interlock, remote-control and BMS wiring and point identification."
      }
    ],
    "pump": [
      {
        "no": "1",
        "section": "Documents",
        "text": "Verify CHW pump tag, make, model, serial number, motor rating and design duty."
      },
      {
        "no": "2",
        "section": "Documents",
        "text": "Check approved pipe schematic, layout and pumping/control arrangement."
      },
      {
        "no": "3",
        "section": "Access",
        "text": "Check service access to pump, motor, coupling, seals, strainer and isolator."
      },
      {
        "no": "4",
        "section": "Mounting",
        "text": "Check foundation, baseplate, grout, anchors and hold-down bolts where applicable."
      },
      {
        "no": "5",
        "section": "Alignment",
        "text": "Check pump/motor alignment after final pipe connection where applicable."
      },
      {
        "no": "6",
        "section": "Mechanical",
        "text": "Check free shaft rotation, bearings and lubrication with power isolated."
      },
      {
        "no": "7",
        "section": "Guarding",
        "text": "Check coupling, drive and safety guards."
      },
      {
        "no": "8",
        "section": "Seals",
        "text": "Check mechanical seal/gland and seal flush arrangement where applicable."
      },
      {
        "no": "9",
        "section": "Pipework",
        "text": "Check suction/discharge pipe sizing, direction and independent supports."
      },
      {
        "no": "10",
        "section": "Pipework",
        "text": "Check flexible connectors/isolators where specified."
      },
      {
        "no": "11",
        "section": "Valves",
        "text": "Check isolation, balancing/control valves and non-return valve direction."
      },
      {
        "no": "12",
        "section": "Strainer",
        "text": "Check suction strainer and cleaning access."
      },
      {
        "no": "13",
        "section": "Testing",
        "text": "Review pipe pressure-test and flushing records."
      },
      {
        "no": "14",
        "section": "Fluid",
        "text": "Confirm treated water/glycol specification where applicable."
      },
      {
        "no": "15",
        "section": "Priming",
        "text": "Confirm pump casing and suction line fully filled, primed and vented."
      },
      {
        "no": "16",
        "section": "Pressure",
        "text": "Verify expansion/pressurization system readiness and required suction conditions."
      },
      {
        "no": "17",
        "section": "Vents & drains",
        "text": "Check vents, drain plugs and connections."
      },
      {
        "no": "18",
        "section": "Instruments",
        "text": "Check suction/discharge gauges, thermometers and flow measurement provisions."
      },
      {
        "no": "19",
        "section": "DP controls",
        "text": "Check differential-pressure sensor and impulse tubing where used for speed control."
      },
      {
        "no": "20",
        "section": "Insulation",
        "text": "Check CHW pipe/pump insulation and vapour barriers where specified."
      },
      {
        "no": "21",
        "section": "Drive controls",
        "text": "Check starter/VSD motor data, speed limits and bypass installation where provided."
      },
      {
        "no": "22",
        "section": "Electrical",
        "text": "Verify panel, isolator, breaker and motor-protection ratings/settings."
      },
      {
        "no": "23",
        "section": "Electrical",
        "text": "Check cable insulation, glands, terminations and circuit identification with power isolated."
      },
      {
        "no": "24",
        "section": "Electrical",
        "text": "Verify protective earth and applicable protection test records."
      },
      {
        "no": "25",
        "section": "Controls",
        "text": "Check interlock, remote-control and BMS wiring and point identification."
      }
    ],
    "chilled-ahu": [
      {
        "no": "1",
        "section": "Documents & identification",
        "text": "Verify AHU equipment ID, manufacturer, model, serial number and nameplate data."
      },
      {
        "no": "2",
        "section": "Documents & identification",
        "text": "Verify approved shop drawings, schematics, method statement and equipment schedule are available."
      },
      {
        "no": "3",
        "section": "Documents & identification",
        "text": "Verify AHU location, orientation, access and service clearances."
      },
      {
        "no": "4",
        "section": "Documents & identification",
        "text": "Verify duct routing and connections against approved drawings."
      },
      {
        "no": "5",
        "section": "General installation",
        "text": "Check AHU and AHU room are clean, dry, free of debris and undamaged."
      },
      {
        "no": "6",
        "section": "General installation",
        "text": "Check floor waterproofing, housekeeping plinth and surrounding finishes."
      },
      {
        "no": "7",
        "section": "General installation",
        "text": "Check casing, access doors, panels, gaskets and locks."
      },
      {
        "no": "8",
        "section": "General installation",
        "text": "Check internal and external AHU insulation, including vapour sealing."
      },
      {
        "no": "9",
        "section": "General installation",
        "text": "Check base frame, supports, spring/rubber isolators and hold-down bolts."
      },
      {
        "no": "10",
        "section": "General installation",
        "text": "Confirm shipping restraints on spring isolators/fan assembly are removed."
      },
      {
        "no": "11",
        "section": "General installation",
        "text": "Check flexible connections between AHU and ductwork."
      },
      {
        "no": "12",
        "section": "General installation",
        "text": "Check ductwork installation is complete and access is unobstructed."
      },
      {
        "no": "13",
        "section": "C. Coil, filters & drainage",
        "text": "Check cooling/heating/pre-cooling coil condition, cleanliness and fin condition."
      },
      {
        "no": "14",
        "section": "C. Coil, filters & drainage",
        "text": "Verify CHW pipe flow/return connections and direction markings."
      },
      {
        "no": "15",
        "section": "C. Coil, filters & drainage",
        "text": "Check CHW pipe insulation, vapour seal, supports and clearances in AHU room."
      },
      {
        "no": "16",
        "section": "C. Coil, filters & drainage",
        "text": "Check strainers, thermometers, pressure gauges, air vents and drain valves."
      },
      {
        "no": "17",
        "section": "C. Coil, filters & drainage",
        "text": "Check isolation valves are open and commissioning valves are set as required."
      },
      {
        "no": "18",
        "section": "C. Coil, filters & drainage",
        "text": "Check filter type, orientation, cleanliness, fit and access."
      },
      {
        "no": "19",
        "section": "C. Coil, filters & drainage",
        "text": "Check temporary filters are removed or replaced before final testing."
      },
      {
        "no": "20",
        "section": "C. Coil, filters & drainage",
        "text": "Check condensate drain pan condition, cleanliness, fall and drain outlet."
      },
      {
        "no": "21",
        "section": "C. Coil, filters & drainage",
        "text": "Check condensate drain pipe slope, U-trap depth, vent and termination."
      },
      {
        "no": "22",
        "section": "C. Coil, filters & drainage",
        "text": "Perform condensate drain test."
      },
      {
        "no": "23",
        "section": "D. Fan & mechanical",
        "text": "Check fan/blower wheel, housing and inlet/outlet for cleanliness and obstruction."
      },
      {
        "no": "24",
        "section": "D. Fan & mechanical",
        "text": "Check pulleys/sheaves, keys, guards and alignment for belt-driven fans."
      },
      {
        "no": "25",
        "section": "D. Fan & mechanical",
        "text": "Check belt condition and tension for belt-driven fans."
      },
      {
        "no": "26",
        "section": "D. Fan & mechanical",
        "text": "Check fan impeller clearance and that there is no rubbing."
      },
      {
        "no": "27",
        "section": "E. Dampers & airside",
        "text": "Check fire/smoke dampers and access panels where applicable."
      },
      {
        "no": "28",
        "section": "E. Dampers & airside",
        "text": "Check volume-control dampers and balancing dampers."
      },
      {
        "no": "29",
        "section": "E. Dampers & airside",
        "text": "Check grilles, diffusers and air paths are clean and unobstructed."
      },
      {
        "no": "30",
        "section": "F. Electrical & controls",
        "text": "Check all electrical terminations, cable insulation and gland tightness."
      },
      {
        "no": "31",
        "section": "F. Electrical & controls",
        "text": "Check earthing/grounding of AHU, motor, panel and electrical components."
      },
      {
        "no": "32",
        "section": "F. Electrical & controls",
        "text": "Verify MCB/RCCB/ELCB, overload and earth-fault protection settings/tests."
      },
      {
        "no": "33",
        "section": "F. Electrical & controls",
        "text": "Check starter/control panel condition, labels, timers, contactors and relays."
      },
      {
        "no": "34",
        "section": "F. Electrical & controls",
        "text": "Verify motor overload setting against motor nameplate FLA."
      },
      {
        "no": "35",
        "section": "I. Completion & handover",
        "text": "Confirm test instruments have valid calibration certificates."
      }
    ],
    "chilled-fcu": [
      {
        "no": "1",
        "section": "Documents",
        "text": "Verify FCU tag, manufacturer, model and serial number against the approved equipment schedule."
      },
      {
        "no": "2",
        "section": "Documents",
        "text": "Verify FCU, diffuser, VCD and pipe locations against approved drawings and schematics."
      },
      {
        "no": "3",
        "section": "Documents",
        "text": "Verify updated as-built layout and water-pipe schematic reflect the installation."
      },
      {
        "no": "4",
        "section": "Access",
        "text": "Check service access to fan, motor, coil, filter, valves, strainer, drain pan and electrical isolator."
      },
      {
        "no": "5",
        "section": "Installation",
        "text": "Check FCU cleanliness, condition and removal of construction debris."
      },
      {
        "no": "6",
        "section": "Installation",
        "text": "Check supports, hangers, fixings, level and vibration isolators."
      },
      {
        "no": "7",
        "section": "Installation",
        "text": "Remove shipping restraints where fitted."
      },
      {
        "no": "8",
        "section": "Installation",
        "text": "Check casing, access panels, seals and internal/external insulation."
      },
      {
        "no": "9",
        "section": "Airside",
        "text": "Check ductwork, return-air box and fresh-air connection are complete where fitted."
      },
      {
        "no": "10",
        "section": "Airside",
        "text": "Check flexible duct and FCU-to-duct connections."
      },
      {
        "no": "11",
        "section": "Airside",
        "text": "Check duct, FCU, isolator and panel identification labels."
      },
      {
        "no": "12",
        "section": "Airside",
        "text": "Check filters, filter access, orientation and sealing."
      },
      {
        "no": "13",
        "section": "Airside",
        "text": "Check grilles, diffusers and return-air paths."
      },
      {
        "no": "14",
        "section": "Airside",
        "text": "Check manual volume-control dampers and commissioning positions."
      },
      {
        "no": "15",
        "section": "Airside",
        "text": "Check fire dampers and access panels where fitted."
      },
      {
        "no": "16",
        "section": "Airside",
        "text": "Check motorized dampers, NRDs and VAV boxes where fitted."
      },
      {
        "no": "17",
        "section": "Coil & water",
        "text": "Check cooling coil cleanliness, fin condition and visible leakage."
      },
      {
        "no": "18",
        "section": "Coil & water",
        "text": "Check CHW supply/return connections and direction labels."
      },
      {
        "no": "19",
        "section": "Coil & water",
        "text": "Check CHW pipe supports, insulation and vapour sealing."
      },
      {
        "no": "20",
        "section": "Coil & water",
        "text": "Check valves, strainers, air vents, drains and measurement points."
      },
      {
        "no": "21",
        "section": "Coil & water",
        "text": "Check control valve and actuator installation."
      },
      {
        "no": "22",
        "section": "Coil & water",
        "text": "Review water-side pressure-test, flushing and venting records before operation."
      },
      {
        "no": "23",
        "section": "Drainage",
        "text": "Check condensate pan, outlet and cleanliness."
      },
      {
        "no": "24",
        "section": "Drainage",
        "text": "Check drain pipe size, slope, supports, trap and termination."
      },
      {
        "no": "25",
        "section": "Drainage",
        "text": "Verify primary/secondary drains and duty/standby drain arrangement where specified."
      },
      {
        "no": "26",
        "section": "Drainage",
        "text": "Perform pre-start water-pour test of primary and secondary drain paths."
      },
      {
        "no": "27",
        "section": "Fan & motor",
        "text": "Check blower wheel, housing, motor and bearing condition with power isolated."
      },
      {
        "no": "28",
        "section": "Fan & motor",
        "text": "Check belts, pulleys, alignment, tension and guards if belt-driven."
      },
      {
        "no": "29",
        "section": "Electrical",
        "text": "Check panel/LMCP circuit arrangement, breaker ratings and motor protection settings."
      },
      {
        "no": "30",
        "section": "Electrical",
        "text": "Check cable condition, terminations, glands and terminal labels with power isolated."
      },
      {
        "no": "31",
        "section": "Electrical",
        "text": "Verify earthing continuity and insulation-resistance test records."
      },
      {
        "no": "32",
        "section": "Electrical",
        "text": "Verify applicable breaker, residual-current and earth-fault protection test records."
      },
      {
        "no": "33",
        "section": "Controls",
        "text": "Check thermostat/sensor mounting location and control wiring."
      },
      {
        "no": "34",
        "section": "Readiness",
        "text": "Verify test instrument calibration, test procedure and outstanding pre-start defects."
      }
    ],
    "mv-fan": [
      {
        "no": "1",
        "section": "Documents",
        "text": "Verify fan tag, manufacturer, model, serial number and motor nameplate."
      },
      {
        "no": "2",
        "section": "Documents",
        "text": "Verify fan, grille, louver, damper and duct layout against approved drawings."
      },
      {
        "no": "3",
        "section": "Documents",
        "text": "Verify electrical schematic and approved control sequence are available."
      },
      {
        "no": "4",
        "section": "Access",
        "text": "Check maintenance access to fan, motor, belts, bearings, dampers and isolator."
      },
      {
        "no": "5",
        "section": "Installation",
        "text": "Check cleanliness and condition of fan, housing and nearby area."
      },
      {
        "no": "6",
        "section": "Installation",
        "text": "Check fan base, mounting, supports, fasteners and alignment."
      },
      {
        "no": "7",
        "section": "Installation",
        "text": "Check anti-vibration isolators and removal of transport restraints."
      },
      {
        "no": "8",
        "section": "Mechanical",
        "text": "Check impeller, blades, shaft and moving parts with power isolated."
      },
      {
        "no": "9",
        "section": "Mechanical",
        "text": "Check fan and motor bearings and lubrication where required."
      },
      {
        "no": "10",
        "section": "Mechanical",
        "text": "Check belt condition, pulley alignment and belt tension if belt-driven."
      },
      {
        "no": "11",
        "section": "Mechanical",
        "text": "Check coupling/alignment if coupling-driven and guards over exposed moving parts."
      },
      {
        "no": "12",
        "section": "Ductwork",
        "text": "Check ductwork completion, supports and access panels."
      },
      {
        "no": "13",
        "section": "Ductwork",
        "text": "Check flexible connections at fan inlet/outlet where provided."
      },
      {
        "no": "14",
        "section": "Ductwork",
        "text": "Check duct joints, seals and specified duct leakage-test records."
      },
      {
        "no": "15",
        "section": "Ductwork",
        "text": "Verify fan, duct, airflow-direction and circuit identification labels."
      },
      {
        "no": "16",
        "section": "Air path",
        "text": "Check grilles, diffusers, louvers, screens and fan inlet/outlet."
      },
      {
        "no": "17",
        "section": "Air path",
        "text": "Check filters where specified and confirm temporary-filter arrangements."
      },
      {
        "no": "18",
        "section": "Dampers",
        "text": "Check VCD installation, access and initial commissioning position."
      },
      {
        "no": "19",
        "section": "Dampers",
        "text": "Check fire/smoke dampers and access where provided."
      },
      {
        "no": "20",
        "section": "Dampers",
        "text": "Check motorized damper actuators, linkages and wiring where fitted."
      },
      {
        "no": "21",
        "section": "Dampers",
        "text": "Check non-return damper installation and blade clearance where fitted."
      },
      {
        "no": "22",
        "section": "Terminals",
        "text": "Check VAV boxes or controlled terminals where connected."
      },
      {
        "no": "23",
        "section": "Electrical",
        "text": "Verify LCP/LMCP labels and breaker/contactor ratings against single-line diagram."
      },
      {
        "no": "24",
        "section": "Electrical",
        "text": "Check cable condition, termination tightness, glands and circuit labels with power isolated."
      },
      {
        "no": "25",
        "section": "Electrical",
        "text": "Verify earthing continuity and cable/motor insulation-resistance test records."
      },
      {
        "no": "26",
        "section": "Electrical",
        "text": "Check overload/protection settings and applicable protective-device test records."
      },
      {
        "no": "27",
        "section": "VSD",
        "text": "Verify VSD motor data, rated current/kW, speed limits and bypass wiring where installed."
      },
      {
        "no": "28",
        "section": "Controls",
        "text": "Check BMS wiring and installed sensors, switches and feedback devices."
      },
      {
        "no": "29",
        "section": "Car-park controls",
        "text": "Verify CO sensor location, calibration records and associated fan/zone mapping where applicable."
      },
      {
        "no": "30",
        "section": "Readiness",
        "text": "Verify test instrument calibration, test procedure and outstanding pre-start defects."
      }
    ],
    "ahu-vrf": [
      {
        "no": "1",
        "section": "Documents",
        "text": "Verify equipment tags, model, serial number, refrigerant and electrical ratings."
      },
      {
        "no": "2",
        "section": "Documents",
        "text": "Check approved drawings, wiring diagrams, design duties and manufacturer installation instructions."
      },
      {
        "no": "3",
        "section": "Installation",
        "text": "Inspect indoor/outdoor casings, coils, fins, fan and motor for damage and debris."
      },
      {
        "no": "4",
        "section": "Installation",
        "text": "Check mounting, supports, fixings, level and vibration isolation."
      },
      {
        "no": "5",
        "section": "Access",
        "text": "Check service access, outdoor clearances and discharge-air path."
      },
      {
        "no": "6",
        "section": "Airside",
        "text": "Check filters, panels, seals and unit insulation."
      },
      {
        "no": "7",
        "section": "Fan & motor",
        "text": "Check fan wheel movement, bearings and guards with power isolated."
      },
      {
        "no": "8",
        "section": "Refrigerant",
        "text": "Check pipe sizes, material, routing, supports, length and elevation difference."
      },
      {
        "no": "9",
        "section": "Refrigerant",
        "text": "Review refrigerant joint installation and nitrogen-purge brazing records where applicable."
      },
      {
        "no": "10",
        "section": "Refrigerant",
        "text": "Review pressure/leak-test record before evacuation and charging."
      },
      {
        "no": "11",
        "section": "Refrigerant",
        "text": "Review evacuation, dehydration and vacuum-hold test record after leak testing."
      },
      {
        "no": "12",
        "section": "Refrigerant",
        "text": "Verify refrigerant type and documented charge calculation / weighed additional charge."
      },
      {
        "no": "13",
        "section": "Refrigerant",
        "text": "Verify service-valve positions, caps and final joint leak check."
      },
      {
        "no": "14",
        "section": "Refrigerant",
        "text": "Check refrigerant pipe insulation, vapour seals and identification."
      },
      {
        "no": "15",
        "section": "Drainage",
        "text": "Check drain pan, pipe size, gradient, supports, trap and termination."
      },
      {
        "no": "16",
        "section": "Drainage",
        "text": "Perform water-pour test of drain path; check secondary drain where fitted."
      },
      {
        "no": "17",
        "section": "Drainage",
        "text": "Check condensate pump, float switch and overflow control installation where fitted."
      },
      {
        "no": "18",
        "section": "Electrical",
        "text": "Check isolator, breaker, cable sizing and protection settings against approved diagram."
      },
      {
        "no": "19",
        "section": "Electrical",
        "text": "Check cable condition, glands and terminations with power isolated."
      },
      {
        "no": "20",
        "section": "Electrical",
        "text": "Review earthing continuity and insulation-resistance test records."
      },
      {
        "no": "21",
        "section": "Electrical",
        "text": "Review applicable electrical protection test records."
      },
      {
        "no": "22",
        "section": "Controls",
        "text": "Check controller, sensor and indoor/outdoor communication wiring."
      },
      {
        "no": "23",
        "section": "Readiness",
        "text": "Confirm supply availability, required pre-energization period and startup readiness."
      },
      {
        "no": "24",
        "section": "System design",
        "text": "Verify indoor/outdoor combination, connected capacity and refrigerant circuit schedule."
      },
      {
        "no": "25",
        "section": "DX AHU",
        "text": "Verify AHU coil, expansion-valve kit, interface controller and sensors where used."
      },
      {
        "no": "26",
        "section": "Refrigerant",
        "text": "Check branch joints, headers and branch-selector boxes where fitted."
      },
      {
        "no": "27",
        "section": "Airside",
        "text": "Check duct routing, supports, flexible joints, diffusers and return/fresh-air paths where fitted."
      },
      {
        "no": "28",
        "section": "Airside",
        "text": "Check VCDs, NRDs, motorized/fire dampers and VAV terminals where fitted."
      },
      {
        "no": "29",
        "section": "Controls",
        "text": "Verify unit addressing, central controller / BMS mapping and AHU interlock wiring."
      },
      {
        "no": "30",
        "section": "Refrigerant safety",
        "text": "Verify required room-volume/charge assessment and any refrigerant detection or mitigation provisions."
      }
    ],
    "fcu-vrf": [
      {
        "no": "1",
        "section": "Documents",
        "text": "Verify equipment tags, model, serial number, refrigerant and electrical ratings."
      },
      {
        "no": "2",
        "section": "Documents",
        "text": "Check approved drawings, wiring diagrams, design duties and manufacturer installation instructions."
      },
      {
        "no": "3",
        "section": "Installation",
        "text": "Inspect indoor/outdoor casings, coils, fins, fan and motor for damage and debris."
      },
      {
        "no": "4",
        "section": "Installation",
        "text": "Check mounting, supports, fixings, level and vibration isolation."
      },
      {
        "no": "5",
        "section": "Access",
        "text": "Check service access, outdoor clearances and discharge-air path."
      },
      {
        "no": "6",
        "section": "Airside",
        "text": "Check filters, panels, seals and unit insulation."
      },
      {
        "no": "7",
        "section": "Fan & motor",
        "text": "Check fan wheel movement, bearings and guards with power isolated."
      },
      {
        "no": "8",
        "section": "Refrigerant",
        "text": "Check pipe sizes, material, routing, supports, length and elevation difference."
      },
      {
        "no": "9",
        "section": "Refrigerant",
        "text": "Review refrigerant joint installation and nitrogen-purge brazing records where applicable."
      },
      {
        "no": "10",
        "section": "Refrigerant",
        "text": "Review pressure/leak-test record before evacuation and charging."
      },
      {
        "no": "11",
        "section": "Refrigerant",
        "text": "Review evacuation, dehydration and vacuum-hold test record after leak testing."
      },
      {
        "no": "12",
        "section": "Refrigerant",
        "text": "Verify refrigerant type and documented charge calculation / weighed additional charge."
      },
      {
        "no": "13",
        "section": "Refrigerant",
        "text": "Verify service-valve positions, caps and final joint leak check."
      },
      {
        "no": "14",
        "section": "Refrigerant",
        "text": "Check refrigerant pipe insulation, vapour seals and identification."
      },
      {
        "no": "15",
        "section": "Drainage",
        "text": "Check drain pan, pipe size, gradient, supports, trap and termination."
      },
      {
        "no": "16",
        "section": "Drainage",
        "text": "Perform water-pour test of drain path; check secondary drain where fitted."
      },
      {
        "no": "17",
        "section": "Drainage",
        "text": "Check condensate pump, float switch and overflow control installation where fitted."
      },
      {
        "no": "18",
        "section": "Electrical",
        "text": "Check isolator, breaker, cable sizing and protection settings against approved diagram."
      },
      {
        "no": "19",
        "section": "Electrical",
        "text": "Check cable condition, glands and terminations with power isolated."
      },
      {
        "no": "20",
        "section": "Electrical",
        "text": "Review earthing continuity and insulation-resistance test records."
      },
      {
        "no": "21",
        "section": "Electrical",
        "text": "Review applicable electrical protection test records."
      },
      {
        "no": "22",
        "section": "Controls",
        "text": "Check controller, sensor and indoor/outdoor communication wiring."
      },
      {
        "no": "23",
        "section": "Readiness",
        "text": "Confirm supply availability, required pre-energization period and startup readiness."
      },
      {
        "no": "24",
        "section": "System design",
        "text": "Verify approved indoor/outdoor model combination and pipe connection pairing."
      },
      {
        "no": "25",
        "section": "Airside",
        "text": "Check ductwork, flexible connections, grilles and dampers for ducted split units."
      },
      {
        "no": "26",
        "section": "Controls",
        "text": "Verify remote controller batteries, receiver, wired controller and optional interface installation."
      },
      {
        "no": "27",
        "section": "Refrigerant safety",
        "text": "Verify required installation-room/charge limits and any specified detection or mitigation provisions."
      }
    ],
    "vsd": [
      {
        "no": "1",
        "section": "Documents",
        "text": "Verify VSD tag, model, motor duty, ratings and approved wiring diagram."
      },
      {
        "no": "2",
        "section": "Installation",
        "text": "Inspect enclosure, mounting, door seals and fan guards."
      },
      {
        "no": "3",
        "section": "Cooling",
        "text": "Check ventilation paths, filters and cooling-fan installation."
      },
      {
        "no": "4",
        "section": "Electrical",
        "text": "Verify panel, door, motor and cable-screen earthing."
      },
      {
        "no": "5",
        "section": "Electrical",
        "text": "Review cable and motor insulation-resistance test results."
      },
      {
        "no": "6",
        "section": "Electrical",
        "text": "Check isolated incoming and motor cables, terminations and phase identification."
      },
      {
        "no": "7",
        "section": "Electrical",
        "text": "Verify isolator, protective devices and cable ratings."
      },
      {
        "no": "8",
        "section": "Controls",
        "text": "Check control cables, shielding, digital/analogue inputs and communication wiring."
      },
      {
        "no": "9",
        "section": "Bypass",
        "text": "Check bypass circuit and mechanical/electrical interlocks if fitted."
      },
      {
        "no": "10",
        "section": "Readiness",
        "text": "Confirm driven equipment, guards, valves/dampers and operating path are ready."
      },
      {
        "no": "11",
        "section": "Startup",
        "text": "Record incoming voltage and phase balance before run command."
      },
      {
        "no": "12",
        "section": "Parameters",
        "text": "Enter and verify motor nameplate data and application parameters."
      },
      {
        "no": "13",
        "section": "Parameters",
        "text": "Check min/max frequency, ramps, current limit, protection and restart settings."
      },
      {
        "no": "14",
        "section": "Controls",
        "text": "Test local/remote start-stop, direction and run indication."
      },
      {
        "no": "15",
        "section": "Cooling",
        "text": "Verify drive cooling fans and ventilation during operation."
      },
      {
        "no": "16",
        "section": "Speed test",
        "text": "Test operation at 25 Hz where permitted by the load"
      },
      {
        "no": "17",
        "section": "Controls",
        "text": "Test analogue reference, feedback scaling and PID response where used."
      },
      {
        "no": "18",
        "section": "BMS",
        "text": "Verify BMS commands, speed feedback, run/trip status and alarms."
      },
      {
        "no": "19",
        "section": "Protection",
        "text": "Test relevant interlocks, emergency stop/STO and fault reset where fitted."
      },
      {
        "no": "20",
        "section": "Bypass",
        "text": "Test VSD/bypass changeover where fitted using approved procedure."
      },
      {
        "no": "21",
        "section": "Power recovery",
        "text": "Test communication-loss and controlled power-restoration response."
      },
      {
        "no": "22",
        "section": "Performance",
        "text": "Run at design duty; check motor current, noise, vibration and drive temperature."
      },
      {
        "no": "23",
        "section": "Handover",
        "text": "Restore normal mode, save final parameters and close defects."
      }
    ],
    "pipe-flush": [
      {
        "no": "1",
        "section": "Documents",
        "text": "Confirm approved flushing method, risk assessment, zoning diagram and acceptance criteria."
      },
      {
        "no": "2",
        "section": "Pressure test",
        "text": "Review completed hydrostatic test and inspection records."
      },
      {
        "no": "3",
        "section": "Isolation",
        "text": "Verify chillers, coils, control valves, meters and sensitive equipment protection/bypasses."
      },
      {
        "no": "4",
        "section": "Valves",
        "text": "Check valve lineup for each flushing zone and branch."
      },
      {
        "no": "6",
        "section": "Strainers",
        "text": "Verify temporary strainers/screens and accessible cleaning points."
      },
      {
        "no": "7",
        "section": "Temporary works",
        "text": "Inspect flushing pump, hoses, bypasses, restraints and connections."
      },
      {
        "no": "8",
        "section": "Water supply",
        "text": "Confirm approved fill/makeup source, backflow protection and supply capacity."
      },
      {
        "no": "9",
        "section": "Discharge",
        "text": "Verify drain route, collection capacity and disposal arrangement."
      },
      {
        "no": "10",
        "section": "Instrumentation",
        "text": "Verify calibrated flow, pressure and water-quality instruments."
      },
      {
        "no": "11",
        "section": "Treatment",
        "text": "Confirm specialist cleaning/treatment plan and chemical compatibility where required."
      },
      {
        "no": "12",
        "section": "Readiness",
        "text": "Fill and vent the selected circuit; check pump priming."
      },
      {
        "no": "13",
        "section": "Startup",
        "text": "Start flushing pump; verify rotation, circulation and leakage."
      },
      {
        "no": "14",
        "section": "Flow",
        "text": "Measure flushing flow and confirm achieved velocity in each zone/branch."
      },
      {
        "no": "15",
        "section": "Coverage",
        "text": "Flush every planned main, riser, branch and applicable terminal connection."
      },
      {
        "no": "16",
        "section": "Displacement",
        "text": "Perform approved feed-and-bleed or other flushing sequence."
      },
      {
        "no": "17",
        "section": "Monitoring",
        "text": "Record supply and system-water appearance, pH and other specified parameters."
      },
      {
        "no": "18",
        "section": "Strainers",
        "text": "Stop and isolate safely for strainer inspection/cleaning as required."
      },
      {
        "no": "19",
        "section": "Chemical cleaning",
        "text": "Carry out chemical cleaning, circulation and rinsing where specified."
      },
      {
        "no": "20",
        "section": "Water quality",
        "text": "Measure turbidity and compare with supply/background water as specified."
      },
      {
        "no": "21",
        "section": "Sampling",
        "text": "Take representative labelled samples at specified points for laboratory testing."
      },
      {
        "no": "22",
        "section": "Completion",
        "text": "Complete final strainer cleaning and approved drain/refill sequence."
      },
      {
        "no": "23",
        "section": "Treatment",
        "text": "Dose final inhibitor and other specified treatment under specialist control."
      },
      {
        "no": "24",
        "section": "Reinstatement",
        "text": "Remove temporary bypasses/screens; reinstate equipment, strainers and valves."
      },
      {
        "no": "25",
        "section": "Circulation",
        "text": "Vent and circulate treated water; verify final leaks, pressure and preservation arrangements."
      },
      {
        "no": "26",
        "section": "Handover",
        "text": "Submit zone flow log, water-quality/lab reports and signed flushing acceptance."
      }
    ],
    "duct-leak": [
      {
        "no": "1",
        "section": "Documents",
        "text": "Confirm approved method, test standard/edition, scope and duct section drawing."
      },
      {
        "no": "2",
        "section": "Criteria",
        "text": "Confirm duct pressure rating, test pressure and positive/negative test direction."
      },
      {
        "no": "3",
        "section": "Criteria",
        "text": "Determine tested duct surface area and allowable leakage for the selected standard."
      },
      {
        "no": "4",
        "section": "Construction",
        "text": "Inspect joints, seams, flanges, gaskets and sealant curing."
      },
      {
        "no": "5",
        "section": "Supports",
        "text": "Inspect duct condition, supports, access panels and fixing security."
      },
      {
        "no": "6",
        "section": "Isolation",
        "text": "Blank all boundary openings; secure temporary blanks and test connections."
      },
      {
        "no": "7",
        "section": "Dampers",
        "text": "Check internal damper positions and test-section isolation."
      },
      {
        "no": "8",
        "section": "Instruments",
        "text": "Remove or isolate sensitive sensors/meters and excluded equipment as specified."
      },
      {
        "no": "9",
        "section": "Test rig",
        "text": "Check calibrated leakage tester, pressure gauge, hoses and measuring devices."
      },
      {
        "no": "10",
        "section": "Test rig",
        "text": "Check test-rig connections, zero and rig leakage allowance."
      },
      {
        "no": "11",
        "section": "Safety",
        "text": "Verify safe access, barriers, toolbox briefing and electrical condition of blower."
      },
      {
        "no": "12",
        "section": "Readiness",
        "text": "Complete joint walk-down and obtain clearance to pressurize."
      },
      {
        "no": "13",
        "section": "Startup",
        "text": "Run test blower and increase pressure gradually in the specified direction."
      },
      {
        "no": "14",
        "section": "Stabilization",
        "text": "Stabilize the section at specified test pressure."
      },
      {
        "no": "15",
        "section": "Measurement",
        "text": "Measure leakage airflow at stabilized pressure."
      },
      {
        "no": "16",
        "section": "Calculation",
        "text": "Calculate total allowable leakage for the tested area and selected standard."
      },
      {
        "no": "17",
        "section": "Acceptance",
        "text": "Compare measured leakage with allowable total leakage."
      },
      {
        "no": "18",
        "section": "Inspection",
        "text": "Inspect for leakage locations and abnormal duct/blank movement during test."
      },
      {
        "no": "19",
        "section": "Repair",
        "text": "Depressurize and repair failed joints or defective permanent sealing."
      },
      {
        "no": "20",
        "section": "Retest",
        "text": "Repeat the pressure/leakage test after repairs where necessary."
      },
      {
        "no": "21",
        "section": "Coverage",
        "text": "Verify all specified sections and any required additional testing are complete."
      },
      {
        "no": "22",
        "section": "Reinstatement",
        "text": "Stop blower, confirm zero pressure, remove blanks and reinstate instruments/dampers."
      },
      {
        "no": "23",
        "section": "Handover",
        "text": "Submit signed pressure/leakage report, area calculations and marked-up section drawings."
      }
    ],
    "bms-mv": [
      {
        "no": "1",
        "text": "Start/Stop Command"
      },
      {
        "no": "2",
        "text": "Run Status"
      },
      {
        "no": "3",
        "text": "Trip Status"
      },
      {
        "no": "4",
        "text": "Auto/Manual Switch Mode Satus"
      },
      {
        "no": "5",
        "text": "Mismatch Alarm Test"
      },
      {
        "no": "6",
        "text": "Panel Power failure Status Test"
      },
      {
        "no": "7",
        "text": "Mixed Air Temperature"
      },
      {
        "no": "8",
        "text": "Low Speed Control and Feedback Test ( If any )"
      },
      {
        "no": "9",
        "text": "Medium Speed Control and Feedback Test ( If any )"
      },
      {
        "no": "10",
        "text": "High Speed Control and Feedback Test ( If any )"
      },
      {
        "no": "11",
        "text": "Suction Duct Air Static Pressure"
      },
      {
        "no": "12",
        "text": "Discharge Duct Air Static Pressure"
      },
      {
        "no": "13",
        "text": "VAV Dampers Position feeback"
      },
      {
        "no": "14",
        "text": "VAV Damper Command (Open/Close/Modulate)"
      },
      {
        "no": "15",
        "text": "M. Dampers Position feeback"
      },
      {
        "no": "16",
        "text": "M. Damper Command (Open/Close/Modulate)"
      },
      {
        "no": "17",
        "text": "Hardwired safety interlocks ensure the dampers (e.g., fire/smoke dampers open/ close)"
      },
      {
        "no": "18",
        "text": "Interlock Status"
      },
      {
        "no": "19",
        "text": "Smoke Detection"
      },
      {
        "no": "20",
        "text": "Filter Status Alarms"
      },
      {
        "no": "21",
        "text": "MV fan Air CO Level"
      },
      {
        "no": "22",
        "text": "Schedule Control Test"
      }
    ],
    "bms-ac": [
      {
        "no": "1",
        "text": "Start/Stop Command"
      },
      {
        "no": "2",
        "text": "Run Status"
      },
      {
        "no": "3",
        "text": "Trip Status"
      },
      {
        "no": "4",
        "text": "Auto/Manual Switch Mode Satus"
      },
      {
        "no": "5",
        "text": "Mismatch Alarm Test"
      },
      {
        "no": "6",
        "text": "Panel Power failure Status Test"
      },
      {
        "no": "7",
        "text": "Mixed Air Temperature"
      },
      {
        "no": "8",
        "text": "Outside Air Temperature and Humidity"
      },
      {
        "no": "9",
        "text": "Supply Air Temperature and Humidity"
      },
      {
        "no": "10",
        "text": "Room Temperature Reading (°C)"
      },
      {
        "no": "11",
        "text": "Room Humidity Reading (%RH)"
      },
      {
        "no": "12",
        "text": "PIBCV or Modulating Valve Stimulation Test (SP High)"
      },
      {
        "no": "13",
        "text": "PIBCV or ModulatingValve Stimulation Test (SP Low)"
      },
      {
        "no": "14",
        "text": "Low Speed Control and Feedback Test ( If any )"
      },
      {
        "no": "15",
        "text": "Medium Speed Control and Feedback Test ( If any )"
      },
      {
        "no": "16",
        "text": "High Speed Control and Feedback Test ( If any )"
      },
      {
        "no": "17",
        "text": "Supply Duct Air Static Pressure"
      },
      {
        "no": "18",
        "text": "Return Duct Air Static Pressure"
      },
      {
        "no": "19",
        "text": "Chilled Water Supply temperature"
      },
      {
        "no": "20",
        "text": "Chilled Water Return Temperature"
      },
      {
        "no": "21",
        "text": "Chilled Water Flow Rate"
      },
      {
        "no": "22",
        "text": "VAV Dampers Position feeback"
      },
      {
        "no": "23",
        "text": "VAV Damper Command (Open/Close/Modulate)"
      },
      {
        "no": "24",
        "text": "M. Dampers Position feeback"
      },
      {
        "no": "25",
        "text": "M. Damper Command (Open/Close/Modulate)"
      },
      {
        "no": "26",
        "text": "Hardwired safety interlocks ensure the dampers (e.g., fire/smoke dampers open/ close)"
      },
      {
        "no": "27",
        "text": "Interlock Status"
      },
      {
        "no": "28",
        "text": "Heater start / Stop Command ( If any)"
      },
      {
        "no": "29",
        "text": "Smoke Detection"
      },
      {
        "no": "30",
        "text": "Filter Status Alarms"
      },
      {
        "no": "31",
        "text": "Return Air CO2 Level"
      },
      {
        "no": "32",
        "text": "Condensate Drain Overflow Alarm ( if any)"
      },
      {
        "no": "33",
        "text": "Schedule Control Test"
      }
    ],
    "ahu-fcu-pcl": [
      {
        "no": "1",
        "text": "Identification"
      },
      {
        "no": "1.1",
        "text": "Identification Number"
      },
      {
        "no": "1.2",
        "text": "Location"
      },
      {
        "no": "1.3",
        "text": "Serial Number"
      },
      {
        "no": "1.4",
        "text": "Model Number"
      },
      {
        "no": "1.5",
        "text": "Capacity (M/S or Cmh)"
      },
      {
        "no": "1.6",
        "text": "Cooling Capacity"
      },
      {
        "no": "1.7",
        "text": "Motor KW"
      },
      {
        "no": "2",
        "text": "Physical Inspection"
      },
      {
        "no": "2.1",
        "text": "Filter Condition / Size"
      },
      {
        "no": "2.2",
        "text": "Access Panel Ceiling"
      },
      {
        "no": "2.3",
        "text": "Corrosion/Damage Check"
      },
      {
        "no": "2.4",
        "text": "Belt Condition and Tension"
      },
      {
        "no": "2.5",
        "text": "Fan Blade Inspection"
      },
      {
        "no": "2.6",
        "text": "Motor and Fan Drive Inspection"
      },
      {
        "no": "2.7",
        "text": "Belt Model"
      },
      {
        "no": "2.8",
        "text": "Filter differential pressure switch"
      },
      {
        "no": "2.9",
        "text": "Motorized Damper Check"
      },
      {
        "no": "2.10",
        "text": "NRD ( Non- Return Damper) Check"
      },
      {
        "no": "2.11",
        "text": "Smoke Detectors Check"
      },
      {
        "no": "2.12",
        "text": "Fire Dampers Check"
      },
      {
        "no": "2.13",
        "text": "Co2 Sensor"
      },
      {
        "no": "2.14",
        "text": "Main Duct Szie"
      },
      {
        "no": "2.15",
        "text": "Main Duct Retrun VCD Damper"
      },
      {
        "no": "2.16",
        "text": "Condensate Drainage Check"
      },
      {
        "no": "2.17",
        "text": "Outlet of Drain complete With 'U' trap"
      },
      {
        "no": "2.18",
        "text": "Check Pan Cleaning"
      },
      {
        "no": "2.19",
        "text": "Duct Insulation damage or Condensation"
      },
      {
        "no": "2.20",
        "text": "CHWP Pipe Insulation damage or Condensation"
      },
      {
        "no": "2.21",
        "text": "CHWP Pipe thermometer"
      },
      {
        "no": "2.22",
        "text": "CHWP Gate Valve Condition"
      },
      {
        "no": "2.23",
        "text": "CHWP Pressure Gague Condition"
      },
      {
        "no": "2.24",
        "text": "Equipment Body damage or Condensation"
      },
      {
        "no": "2.25",
        "text": "Noise Inspection (db)"
      },
      {
        "no": "2.26",
        "text": "Vibration Inspection"
      },
      {
        "no": "2.27",
        "text": "UV Light Condition"
      },
      {
        "no": "3",
        "text": "Air Side"
      },
      {
        "no": "3.1",
        "text": "Total Airflow Rate (M/S or Cmh)"
      },
      {
        "no": "3.2",
        "text": "VSD Model/Fan Speed Settings"
      },
      {
        "no": "3.3",
        "text": "Main supply Duct Temperature (°C)"
      },
      {
        "no": "3.4",
        "text": "Main Return Duct Temp (°C)"
      },
      {
        "no": "3.5",
        "text": "Room Set Point Temperature (°C)"
      },
      {
        "no": "3.6",
        "text": "On Coil Temp"
      },
      {
        "no": "3.7",
        "text": "OFF coil Temp"
      },
      {
        "no": "3.8",
        "text": "Relative Humidity"
      },
      {
        "no": "3.9",
        "text": "Satic pressure SP- SP/ SP-CV"
      },
      {
        "no": "4",
        "text": "BMS System"
      },
      {
        "no": "4.1",
        "text": "Control System Check"
      },
      {
        "no": "4.2",
        "text": "Thermostats /Sensor Calibration"
      },
      {
        "no": "4.3",
        "text": "LCP Verify functionality of on/off switches"
      },
      {
        "no": "4.4",
        "text": "VSD speed controls"
      },
      {
        "no": "5",
        "text": "Water Side"
      },
      {
        "no": "5.1",
        "text": "Check any Visible damage to the coil surface and coil fins"
      },
      {
        "no": "5.2",
        "text": "Corrosion/Fouling Check"
      },
      {
        "no": "5.3",
        "text": "Chilled water Pressure Gauge readings"
      },
      {
        "no": "5.4",
        "text": "CWPS/ CWPR Water Temp"
      },
      {
        "no": "5.5",
        "text": "CWP Control valve Working condition"
      },
      {
        "no": "5.6",
        "text": "Valve fully open"
      },
      {
        "no": "5.8",
        "text": "Valve fully Close"
      },
      {
        "no": "5.10",
        "text": "CHilled water Pipe Size ( Dia)"
      },
      {
        "no": "5.11",
        "text": "Water Leak Sensor"
      },
      {
        "no": "6",
        "text": "Electrical Connections"
      },
      {
        "no": "6.1",
        "text": "Electrical Inspection"
      },
      {
        "no": "6.2",
        "text": "Wiring Check"
      },
      {
        "no": "6.3",
        "text": "Panel Singel Line diagram Drawing"
      },
      {
        "no": "6.4",
        "text": "Motor Starting Amp"
      },
      {
        "no": "6.5",
        "text": "Motor Runing Amp"
      },
      {
        "no": "6.6",
        "text": "Check In-Coming Isolater"
      },
      {
        "no": "7",
        "text": "Energy Efficiency"
      },
      {
        "no": "7.1",
        "text": "Energy Leaks Check"
      },
      {
        "no": "7.2",
        "text": "Energy Recovery System Check"
      },
      {
        "no": "8",
        "text": "Maintenance Records"
      }
    ],
    "mvf-pcl": [
      {
        "no": "1",
        "text": "Identification"
      },
      {
        "no": "1.1",
        "text": "Fan Identification Number"
      },
      {
        "no": "1.2",
        "text": "Fan Location"
      },
      {
        "no": "1.3",
        "text": "Fan Serial Number"
      },
      {
        "no": "1.4",
        "text": "Fan Model Number"
      },
      {
        "no": "1.5",
        "text": "Fan Capacity (M/S or Cmh)"
      },
      {
        "no": "1.6",
        "text": "Fan Motor KW"
      },
      {
        "no": "1.7",
        "text": "Manufacturer"
      },
      {
        "no": "2",
        "text": "Physical Inspection"
      },
      {
        "no": "2.1",
        "text": "Fan Housing Check for signs of corrosion, rust ,or damage"
      },
      {
        "no": "2.2",
        "text": "Fan Housing Ensure all mounting bolts and screws are secure"
      },
      {
        "no": "2.3",
        "text": "Fan Blades Inspect for damage, cracks, or excessive wear"
      },
      {
        "no": "2.4",
        "text": "Fan Guard Check for damage or obstruction"
      },
      {
        "no": "2.5",
        "text": "Bearings Check for noise and smooth operation"
      },
      {
        "no": "2.6",
        "text": "Access Panel Ceiling"
      },
      {
        "no": "2.7",
        "text": "Corrosion/Damage Check"
      },
      {
        "no": "2.8",
        "text": "Belt Condition and Tension"
      },
      {
        "no": "2.9",
        "text": "Fan Blade Inspection"
      },
      {
        "no": "2.10",
        "text": "Motor and Fan Drive Inspection"
      },
      {
        "no": "2.11",
        "text": "Belt Model"
      },
      {
        "no": "2.12",
        "text": "Motorized Damper Check"
      },
      {
        "no": "2.13",
        "text": "NRD ( Non- Return Damper) Check"
      },
      {
        "no": "2.14",
        "text": "Smoke Detectors Check"
      },
      {
        "no": "2.15",
        "text": "Co2 Sensor Check"
      },
      {
        "no": "2.16",
        "text": "Main Duct Szie"
      },
      {
        "no": "2.17",
        "text": "Main Duct Retrun VCD Damper"
      },
      {
        "no": "2.18",
        "text": "Duct Insulation damage or Condensation"
      },
      {
        "no": "2.19",
        "text": "Equipment Body damage or Condensation"
      },
      {
        "no": "2.20",
        "text": "Vibration Inspection"
      },
      {
        "no": "2.21",
        "text": "UV Light Condition"
      },
      {
        "no": "3",
        "text": "Air Side"
      },
      {
        "no": "3.1",
        "text": "Total Airflow Rate (M/S or Cmh)"
      },
      {
        "no": "3.2",
        "text": "VSD Model/Fan Speed Settings"
      },
      {
        "no": "3.3",
        "text": "Satic pressure SP- SP/ SP-CV"
      },
      {
        "no": "4",
        "text": "BMS System"
      },
      {
        "no": "4.1",
        "text": "Control System Check"
      },
      {
        "no": "4.2",
        "text": "LCP Verify functionality of on/off switches"
      },
      {
        "no": "4.3",
        "text": "VSD speed controls"
      },
      {
        "no": "5",
        "text": "Electrical Connections"
      },
      {
        "no": "5.1",
        "text": "Electrical Inspection"
      },
      {
        "no": "5.2",
        "text": "Wiring Check"
      },
      {
        "no": "5.3",
        "text": "Panel Singel Line diagram Drawing"
      },
      {
        "no": "5.4",
        "text": "Motor Starting Amp"
      },
      {
        "no": "5.5",
        "text": "Motor Runing Amp"
      },
      {
        "no": "5.6",
        "text": "Check In-Coming Isolater"
      },
      {
        "no": "6",
        "text": "Energy Efficiency"
      },
      {
        "no": "6.1",
        "text": "Energy Leaks Check"
      },
      {
        "no": "6.2",
        "text": "Energy Recovery System Check"
      },
      {
        "no": "7",
        "text": "Maintenance Records"
      }
    ],
    "vrf-pcl": [
      {
        "no": "1",
        "text": "Indoor Identification"
      },
      {
        "no": "1.1",
        "text": "Identification Number"
      },
      {
        "no": "1.2",
        "text": "Location"
      },
      {
        "no": "1.3",
        "text": "Serial Number"
      },
      {
        "no": "1.4",
        "text": "Model Number"
      },
      {
        "no": "1.5",
        "text": "Capacity (M/S or Cmh)"
      },
      {
        "no": "1.6",
        "text": "Motor KW"
      },
      {
        "no": "1.7",
        "text": "Manufacturer"
      },
      {
        "no": "2",
        "text": "Outdoor Identification"
      },
      {
        "no": "2.1",
        "text": "Identification Number"
      },
      {
        "no": "2.2",
        "text": "Manufacturer"
      },
      {
        "no": "2.3",
        "text": "Location"
      },
      {
        "no": "2.4",
        "text": "Serial Number"
      },
      {
        "no": "2.5",
        "text": "Model Number"
      },
      {
        "no": "2.6",
        "text": "Type Of Refrigerants"
      },
      {
        "no": "2.7",
        "text": "Total Cooling Capacity KW"
      },
      {
        "no": "2.8",
        "text": "Out door Coil temp°C"
      },
      {
        "no": "2.9",
        "text": "Power input"
      },
      {
        "no": "2.10",
        "text": "Power supply"
      },
      {
        "no": "2.11",
        "text": "System Operating Pressure"
      },
      {
        "no": "3",
        "text": "Physical Inspection"
      },
      {
        "no": "3.1",
        "text": "Filter Condition / Size"
      },
      {
        "no": "3.2",
        "text": "Access Panel Ceiling"
      },
      {
        "no": "3.3",
        "text": "Corrosion/Damage Check"
      },
      {
        "no": "3.4",
        "text": "Belt Condition and Tension"
      },
      {
        "no": "3.5",
        "text": "Fan Blade Inspection"
      },
      {
        "no": "3.6",
        "text": "Motor and Fan Drive Inspection"
      },
      {
        "no": "3.7",
        "text": "Belt Model"
      },
      {
        "no": "3.8",
        "text": "Filter differential pressure switch"
      },
      {
        "no": "3.9",
        "text": "Motorized Damper Check"
      },
      {
        "no": "3.10",
        "text": "NRD ( Non- Return Damper) Check"
      },
      {
        "no": "3.11",
        "text": "Smoke Detectors Check"
      },
      {
        "no": "3.12",
        "text": "Co2 Sensor"
      },
      {
        "no": "3.13",
        "text": "Main Duct Szie Supply and Return"
      },
      {
        "no": "3.14",
        "text": "Main Duct Retrun VCD Damper"
      },
      {
        "no": "3.15",
        "text": "Condensate Drainage Check"
      },
      {
        "no": "3.16",
        "text": "Outlet of Drain complete With 'U' trap"
      },
      {
        "no": "3.17",
        "text": "Check Pan Cleaning"
      },
      {
        "no": "3.18",
        "text": "Duct Insulation damage or Condensation"
      },
      {
        "no": "3.19",
        "text": "Ref. Pipe Insulation damage or Condensation"
      },
      {
        "no": "3.20",
        "text": "Check any Visible damage to the coil surface and coil fins"
      },
      {
        "no": "3.21",
        "text": "Equipment Body damage or Condensation"
      },
      {
        "no": "3.22",
        "text": "Noise Inspection (db)"
      },
      {
        "no": "3.23",
        "text": "Vibration Inspection"
      },
      {
        "no": "3.24",
        "text": "Ref. Pipe Size ( Dia)"
      },
      {
        "no": "3.25",
        "text": "UV Light Condition"
      },
      {
        "no": "4",
        "text": "Air Side"
      },
      {
        "no": "4.1",
        "text": "Total Airflow Rate (M/S or Cmh)"
      },
      {
        "no": "4.2",
        "text": "VSD Model/Fan Speed Settings"
      },
      {
        "no": "4.3",
        "text": "Main supply Duct Temperature (°C)"
      },
      {
        "no": "4.4",
        "text": "Main Return Duct Temp (°C)"
      },
      {
        "no": "4.5",
        "text": "On Coil Temp"
      },
      {
        "no": "4.6",
        "text": "OFF coil Temp"
      },
      {
        "no": "4.7",
        "text": "Heat Coil Temp"
      },
      {
        "no": "4.8",
        "text": "Relative Humidity"
      },
      {
        "no": "4.9",
        "text": "Satic pressure SP- SP/ SP-CV"
      },
      {
        "no": "4.10",
        "text": "Check Smoke Detectors Condition"
      },
      {
        "no": "6",
        "text": "BMS System"
      },
      {
        "no": "6.1",
        "text": "Control System Check With CRC / BMS Graphic"
      },
      {
        "no": "6.2",
        "text": "Thermostats /Sensor Calibration"
      },
      {
        "no": "6.3",
        "text": "LCP Verify functionality of on/off switches"
      },
      {
        "no": "6.4",
        "text": "VSD speed controls"
      },
      {
        "no": "7",
        "text": "Electrical Connections"
      },
      {
        "no": "7.1",
        "text": "Check for loose connections or frayed wires"
      },
      {
        "no": "7.2",
        "text": "Wiring Check ,Ensure proper grounding"
      },
      {
        "no": "7.3",
        "text": "Panel Singel Line diagram Drawing"
      },
      {
        "no": "7.4",
        "text": "Motor Starting Amp / Runing Amp"
      },
      {
        "no": "7.5",
        "text": "Check In-Coming Isolater"
      },
      {
        "no": "8",
        "text": "Energy Efficiency"
      },
      {
        "no": "8.1",
        "text": "Energy Leaks Check"
      },
      {
        "no": "8.2",
        "text": "Energy Recovery System Check"
      },
      {
        "no": "9",
        "text": "Maintenance Records"
      }
    ]
  }
};
