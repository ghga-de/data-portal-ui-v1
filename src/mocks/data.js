// Copyright 2021 - 2024 Universität Tübingen, DKFZ and EMBL
// for the German Human Genome-Phenome Archive (GHGA)
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const startDate = new Date();
const endDate = new Date(startDate);
endDate.setFullYear(endDate.getFullYear() + 1);
const access_starts = startDate.toISOString();
const access_ends = endDate.toISOString(); // Static fake data for mocking the backend

export const user = {
  id: "j.doe@ghga.de",
  ext_id: "aacaffeecaffeecaffeecaffeecaffeecaffeeaad@lifescience-ri.eu",
  name: "John Doe",
  title: "Dr.",
  full_name: "Dr. John Doe",
  email: "j.jdoe@home.org",
  role: "data_steward",
};

export const allIVAs = [
  {
    id: "0063effb-2c43-4948-ba6f-f15425cb72d7",
    type: "InPerson",
    value: "Hauptstr. 321",
    changed: "2024-01-01T00:00:00",
    state: "CodeRequested",
    user_name: "Prof. Jean Doe",
    user_email: "j2.jdoe@home.org",
  },
  {
    id: "783d9682-d5e5-4ce7-9157-9eeb53a1e9ba",
    type: "Phone",
    value: "+441234567890004",
    changed: "2024-02-01T00:00:00",
    state: "Verified",
    user_name: "Dr. John Doe",
    user_email: "j.jdoe@home.org",
  },
  {
    id: "32b50c92-489f-4418-ace8-e7552e3cf36d",
    type: "Phone",
    value: "+491234567890000",
    changed: "2024-03-01T00:00:00",
    state: "Unverified",
    user_name: "Dr. John Doe",
    user_email: "j.jdoe@home.org",
  },
  {
    id: "fc3c0ad8-01a4-4eb1-b8f3-40b04bb4bcb2",
    type: "PostalAddress",
    value: "Wilhelmstr. 123",
    changed: "2024-04-01T00:00:00",
    state: "CodeTransmitted",
    user_name: "Dr. John Doe",
    user_email: "j.jdoe@home.org",
  },
  {
    id: "347368b5-718e-49ba-80ad-bc128e83b609",
    type: "InPerson",
    value: "Mathematikon",
    changed: "2024-05-01T00:00:00",
    state: "CodeCreated",
    user_name: "Prof. Jean Doe",
    user_email: "j2.jdoe@home.org",
  },
];

export const accessRequests = [
  {
    id: "62bcc452-a70b-47c1-9870-55da40d8e45f",
    user_id: "j.doe@ghga.de",
    dataset_id: "GHGAD588887987",
    full_user_name: "Dr. John Doe",
    email: "j.jdoe@home.org",
    request_text: "This is a test request for dataset GHGAD588887987.",
    access_starts: access_starts,
    access_ends: access_ends,
    request_created: "2023-05-09T12:04:02.000Z",
    status: "pending",
    status_changed: null,
    changed_by: null,
  },

  {
    id: "4ef4ccac-6c0a-4be6-9637-b33925178cea",
    user_id: "j.doe@ghga.de",
    dataset_id: "GHGAD588887988",
    full_user_name: "Dr. John Doe",
    email: "j.jdoe@home.org",
    request_text: "This is a test request for dataset GHGAD588887988.",
    access_starts: access_starts,
    access_ends: access_ends,
    request_created: "2023-05-11T12:04:02.000Z",
    status: "allowed",
    status_changed: "2023-05-19T12:04:03.000Z",
    changed_by: "j.doe@ghga.de",
    iva_id: "783d9682-d5e5-4ce7-9157-9eeb53a1e9ba",
  },

  {
    id: "a787d591-4264-4f48-8827-598585db868e",
    user_id: "j.doe@ghga.de",
    dataset_id: "GHGAD588887989",
    full_user_name: "Dr. John Doe",
    email: "j.jdoe@home.org",
    request_text: "This is a test request for dataset GHGAD588887989.",
    access_starts: access_starts,
    access_ends: access_ends,
    request_created: "2023-05-18T12:04:03.000Z",
    status: "denied",
    status_changed: "2023-05-19T12:04:02.000Z",
    changed_by: "j.doe@ghga.de",
  },

  {
    id: "9409db13-e23e-433e-9afa-544d8f25b720",
    user_id: "j.doe@ghga.de",
    dataset_id: "GHGAD588887989",
    full_user_name: "Dr. John Doe",
    email: "j.jdoe@home.org",
    request_text: "This is a test request for dataset GHGAD588887989.",
    access_starts: access_starts,
    access_ends: access_ends,
    request_created: "2023-05-18T12:04:03.000Z",
    status: "pending",
    status_changed: "2023-05-19T12:04:02.000Z",
    changed_by: "j.doe@ghga.de",
  },
];

export const getAccessRequests = (user_id, dataset_id) =>
  accessRequests.filter(
    (x) =>
      (!dataset_id || x.dataset_id === dataset_id) &&
      (!user_id || x.user_id === user_id)
  );

export const datasets = [
  {
    id: "GHGAD588887988",
    title: "Some dataset for testing",
    description:
      "This is just a dataset with five dummy files that can be used" +
      " for testing the work package functionality of the Data Portal." +
      " Note that the description can be longer than the title.",
    stage: "download",
  },
];

export const workPackageToken = {
  id: "7f562eb5-a0a5-427d-b40f-f91198d27309",
  token: "MTIzNDU2Nzg5MDEyMzQ1Njc4OTAxMjM0",
};

export const embeddedDataset = {
  accession: "GHGAD588887987",
  ega_accession: "EGAD588887987",
  types: ["Test Type"],
  title: "Test dataset for details",
  description:
    "Test dataset for Metadata Repository get dataset details call. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel risus commodo viverra maecenas accumsan lacus vel. Sit amet risus nullam eget felis eget nunc lobortis mattis. Iaculis at erat pellentesque adipiscing commodo. Volutpat consequat mauris nunc congue. At lectus urna duis convallis convallis tellus id interdum velit. Gravida cum sociis natoque penatibus et. Mauris in aliquam sem fringilla ut morbi. Ultrices gravida dictum fusce ut. At consectetur lorem donec massa sapien faucibus et molestie.",
  study: {
    accession: "GHGAS21215636",
    ega_accession: "EGAS21215636",
    types: ["test_genomics"],
    title: "Test Study",
    description:
      "Test study description. Pharetra convallis posuere morbi leo urna molestie. Ut faucibus pulvinar elementum integer. Nec nam aliquam sem et tortor. Pretium viverra suspendisse potenti nullam ac. Commodo sed egestas egestas fringilla. Tincidunt dui ut ornare lectus sit. Amet massa vitae tortor condimentum lacinia quis vel eros donec. Feugiat pretium nibh ipsum consequat. Pulvinar etiam non quam lacus suspendisse faucibus interdum. Aliquam sem et tortor consequat id.",
    publications: [
      {
        doi: "10.1109/5.771073",
        abstract:
          "Test publication abstract. Varius duis at consectetur lorem donec massa sapien faucibus. Amet porttitor eget dolor morbi non arcu. Urna nec tincidunt praesent semper feugiat nibh sed pulvinar proin. Accumsan tortor posuere ac ut consequat semper viverra nam. Vestibulum lorem sed risus ultricies. Sed odio morbi quis commodo odio. Viverra tellus in hac habitasse. Vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt. Egestas tellus rutrum tellus pellentesque eu tincidunt tortor. Faucibus purus in massa tempor nec feugiat nisl. Nibh cras pulvinar mattis nunc. In tellus integer feugiat scelerisque varius morbi enim nunc faucibus. Vestibulum mattis ullamcorper velit sed ullamcorper morbi tincidunt. Vitae et leo duis ut diam quam. Egestas fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate. Cras pulvinar mattis nunc sed blandit libero volutpat sed cras. Id diam maecenas ultricies mi eget mauris. Pulvinar etiam non quam lacus suspendisse faucibus interdum posuere lorem. Consequat ac felis donec et.",
        title: "Test publication",
        author: "Test author",
        journal: "Test journal",
        year: "2023",
      },
    ],
  },
  data_access_policy: {
    data_access_committee: {
      alias: "Test DAC",
      email: "test[at]test[dot]de",
    },
    policy_text: `Test policy text. Neque volutpat ac tincidunt vitae semper quis. Mi eget mauris pharetra et ultrices neque ornare. Consectetur purus ut faucibus pulvinar elementum. Tortor at risus viverra adipiscing. Aliquam eleifend mi in nulla. Orci ac auctor augue mauris augue neque gravida. Rutrum tellus pellentesque eu tincidunt tortor aliquam nulla. Turpis massa tincidunt dui ut ornare lectus sit amet. Laoreet suspendisse interdum consectetur libero id faucibus nisl tincidunt. Auctor eu augue ut lectus arcu bibendum. Aenean et tortor at risus.\n
      Diam phasellus vestibulum lorem sed risus ultricies tristique nulla aliquet. Tempor orci eu lobortis elementum nibh. Tincidunt praesent semper feugiat nibh sed pulvinar proin gravida. Sed nisi lacus sed viverra tellus. Orci dapibus ultrices in iaculis nunc sed augue. Gravida dictum fusce ut placerat orci nulla pellentesque dignissim enim. Facilisi cras fermentum odio eu. Est placerat in egestas erat. At ultrices mi tempus imperdiet nulla malesuada. Tincidunt arcu non sodales neque. Mi bibendum neque egestas congue quisque.\n
      Pharetra vel turpis nunc eget lorem dolor sed. Commodo quis imperdiet massa tincidunt nunc pulvinar sapien et. Vel pretium lectus quam id leo. Ornare suspendisse sed nisi lacus sed viverra. Magna etiam tempor orci eu lobortis elementum. Aliquam nulla facilisi cras fermentum. Rutrum tellus pellentesque eu tincidunt tortor aliquam nulla facilisi cras. Nam at lectus urna duis. Nunc scelerisque viverra mauris in aliquam sem fringilla ut morbi. At elementum eu facilisis sed odio morbi quis commodo odio. Amet nisl purus in mollis nunc sed id. Tristique sollicitudin nibh sit amet. Arcu risus quis varius quam quisque id diam. Nisl tincidunt eget nullam non. Bibendum arcu vitae elementum curabitur vitae. Vitae aliquet nec ullamcorper sit amet risus nullam eget felis.\n
      Cum sociis natoque penatibus et magnis. Quam lacus suspendisse faucibus interdum. Lorem dolor sed viverra ipsum. Non pulvinar neque laoreet suspendisse interdum consectetur. Sit amet consectetur adipiscing elit ut aliquam. Mi ipsum faucibus vitae aliquet nec. Eget egestas purus viverra accumsan in nisl nisi scelerisque eu. Vel orci porta non pulvinar neque laoreet suspendisse interdum consectetur. Justo nec ultrices dui sapien eget mi proin sed. Lacus viverra vitae congue eu consequat. Purus viverra accumsan in nisl nisi scelerisque eu ultrices vitae. Pretium aenean pharetra magna ac placerat vestibulum lectus mauris. Consequat interdum varius sit amet mattis vulputate. Venenatis cras sed felis eget velit. Cursus metus aliquam eleifend mi in nulla posuere sollicitudin aliquam. Tristique senectus et netus et malesuada fames ac. Massa enim nec dui nunc mattis enim ut tellus elementum.`,
    policy_url: "https://test.com",
  },
  experiments: [
    {
      accession: "GHGAE588321315",
      ega_accession: "EGAE588321315",
      title: "Text Experiment 1",
      description:
        "Test Experiment 1. Sagittis purus sit amet volutpat. Tellus cras adipiscing enim eu turpis egestas pretium. Vitae suscipit tellus mauris a diam maecenas sed enim ut. Vulputate enim nulla aliquet porttitor lacus luctus. Egestas sed sed risus pretium quam vulputate dignissim. Netus et malesuada fames ac turpis egestas maecenas. Nisl condimentum id venenatis a condimentum vitae sapien. Commodo quis imperdiet massa tincidunt nunc pulvinar sapien et. Vitae sapien pellentesque habitant morbi tristique senectus. Leo vel fringilla est ullamcorper eget nulla. Tempus egestas sed sed risus.",
      experiment_method: {
        accession: "GHGAEM654513213",
        type: "Experiment Method 1",
        instrument_model: "Experiment Platform 1",
      },
    },
  ],
  samples: [
    {
      accession: "GHGASA588321315",
      ega_accession: "EGASA588321315",
      description:
        "Test Sample 1. Vivamus arcu felis bibendum ut. Eget mi proin sed libero enim. Metus dictum at tempor commodo ullamcorper a lacus. Tincidunt tortor aliquam nulla facilisi cras. Nullam vehicula ipsum a arcu. Malesuada proin libero nunc consequat. Purus faucibus ornare suspendisse sed nisi lacus sed viverra tellus. Elementum eu facilisis sed odio morbi quis. Condimentum id venenatis a condimentum vitae sapien pellentesque habitant. Purus sit amet volutpat consequat mauris nunc. Ultricies mi quis hendrerit dolor magna eget est lorem. Fermentum leo vel orci porta non pulvinar. Integer malesuada nunc vel risus commodo viverra maecenas.",
      name: "Test anatomical entity",
      case_control_status: "Test control status",
      individual: {
        sex: "Female",
        phenotypic_features_terms: ["Test phenotypic feature 1"],
      },
      biospecimen_type: "Test biospeciment type 1",
      biospecimen_tissue_term: "Test tissue",
    },
  ],
  study_files: [
    {
      accession: "GHGASF956121331",
      ega_accession: "EGAF956121331",
      name: "Test file 1",
      format: "FASTQ",
    },
  ],
  sample_files: [],
  sequencing_process_files: [],
  analysis_process_output_files: [],
};

// get embedded datasets with arbitrary accessions
export const getEmbeddedDataset = (accession) => ({
  ...embeddedDataset,
  accession: accession,
  ega_accession: accession.replace("GHGA", "EGA"),
});

export const datasetSummary = {
  accession: "GHGAD588887987",
  description:
    "Test dataset for Metadata Repository get dataset details call. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel risus commodo viverra maecenas accumsan lacus vel. Sit amet risus nullam eget felis eget nunc lobortis mattis. Iaculis at erat pellentesque adipiscing commodo. Volutpat consequat mauris nunc congue. At lectus urna duis convallis convallis tellus id interdum velit. Gravida cum sociis natoque penatibus et. Mauris in aliquam sem fringilla ut morbi. Ultrices gravida dictum fusce ut. At consectetur lorem donec massa sapien faucibus et molestie.",
  type: ["Test Type"],
  title: "Test dataset for details",
  dac_email: "test[at]test[dot]de;",
  samples_summary: {
    count: 3,
    stats: {
      sex: [
        { value: "Female", count: 1 },
        { value: "Male", count: 1 },
      ],
      tissues: [
        { value: "metastasis", count: 1 },
        { value: "tumor", count: 2 },
      ],
      phenotypic_features: [
        { value: "Test Phenotype 1", count: 2 },
        { value: "Test Phenotype 2", count: 1 },
      ],
    },
  },
  studies_summary: {
    count: 1,
    stats: {
      accession: ["TEST18666800"],
      title: ["Test Study"],
    },
  },
  experiments_summary: {
    count: 14,
    stats: {
      experiment_methods: [
        {
          value: "Ilumina_test",
          count: 10,
        },
        { value: "HiSeq_test", count: 4 },
      ],
    },
  },
  files_summary: {
    count: 27,
    stats: {
      format: [
        { value: "FASTQ", count: 22 },
        { value: "BAM", count: 5 },
      ],
      size: 434543980,
    },
  },
};

// get dataset dummaries with arbitrary accessions
export const getDatasetSummary = (accession) => ({
  ...datasetSummary,
  accession: accession,
});

export const metadataSummary = {
  resource_stats: {
    SequencingProcessFile: {
      count: 532,
      stats: {
        format: [
          { value: "fastq", count: 124 },
          { value: "bam", count: 408 },
        ],
      },
    },
    Individual: {
      count: 5432,
      stats: {
        sex: [
          { value: "Female", count: 1935 },
          { value: "Male", count: 2358 },
        ],
      },
    },
    ExperimentMethod: {
      count: 1400,
      stats: {
        instrument_model: [
          {
            value: "Ilumina_test",
            count: 700,
          },
          {
            value: "HiSeq_test",
            count: 700,
          },
        ],
      },
    },
    Dataset: {
      count: 252,
      stats: {},
    },
  },
};

export const searchResults = {
  facets: [
    {
      key: "studies.type",
      name: "Study Type",
      options: [
        { value: "Option 1", count: 62 },
        { value: "Option 2", count: 37 },
      ],
    },
    {
      key: "type",
      name: "Dataset Type",
      options: [
        { value: "Test dataset type 1", count: 12 },
        { value: "Test dataset type 2", count: 87 },
      ],
    },
  ],
  count: 25, // just to test the paginator
  hits: [
    {
      id_: "GHGAD588887987",
      content: {
        accession: "GHGAD588887987",
        ega_accession: "EGAD588887987",
        title: "Test dataset for details",
        description:
          "Test dataset for Metadata Repository get dataset details call. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel risus commodo viverra maecenas accumsan lacus vel. Sit amet risus nullam eget felis eget nunc lobortis mattis. Iaculis at erat pellentesque adipiscing commodo. Volutpat consequat mauris nunc congue. At lectus urna duis convallis convallis tellus id interdum velit. Gravida cum sociis natoque penatibus et. Mauris in aliquam sem fringilla ut morbi. Ultrices gravida dictum fusce ut. At consectetur lorem donec massa sapien faucibus et molestie.",
        types: ["Test dataset type 1"],
      },
    },
    {
      id_: "GHGAD588887988",
      content: {
        accession: "GHGAD588887988",
        ega_accession: "EGAD588887988",
        title: "Test dataset for details",
        description:
          "Test dataset for Metadata Repository get dataset details call. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel risus commodo viverra maecenas accumsan lacus vel. Sit amet risus nullam eget felis eget nunc lobortis mattis. Iaculis at erat pellentesque adipiscing commodo. Volutpat consequat mauris nunc congue. At lectus urna duis convallis convallis tellus id interdum velit. Gravida cum sociis natoque penatibus et. Mauris in aliquam sem fringilla ut morbi. Ultrices gravida dictum fusce ut. At consectetur lorem donec massa sapien faucibus et molestie.",
        types: ["Test dataset type 1"],
      },
    },
    {
      id_: "GHGAD588887989",
      content: {
        accession: "GHGAD588887989",
        ega_accession: "EGAD588887989",
        title: "Test dataset for details",
        description:
          "Test dataset for Metadata Repository get dataset details call. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Vel risus commodo viverra maecenas accumsan lacus vel. Sit amet risus nullam eget felis eget nunc lobortis mattis. Iaculis at erat pellentesque adipiscing commodo. Volutpat consequat mauris nunc congue. At lectus urna duis convallis convallis tellus id interdum velit. Gravida cum sociis natoque penatibus et. Mauris in aliquam sem fringilla ut morbi. Ultrices gravida dictum fusce ut. At consectetur lorem donec massa sapien faucibus et molestie.",
        types: ["Test dataset type 1"],
      },
    },
  ],
};

export const filesSummary = {
  accession: "GHGAD588887988",
  file_information: [{
    accession: "GHGASF956121331",
    sha256_hash: "58b2e5a09936322db4ab1b921847d0f3b83027e0255cd24d7e58c420845286dc",
    size: 123456789,
    storage_alias: "TUE01"
  }]
}
