import { FacetModel } from "./facets";

export interface DatasetSampleModel {
  id: string;
  tissue: string;
}

export interface DatasetFileModel {
  accession: string;
  format: string;
}

export interface DatasetPublicationModel {
  id: string;
  title: string;
}

export interface DatasetExperimentModel {
  id: string;
  type: string;
  has_sample: DatasetSampleModel[];
  has_file: DatasetFileModel[];
}

export interface DatasetModel {
  document_type: string;
  id: string;
  accession: string;
  title: string;
  description: string;
  type: string[];
  has_file: DatasetFileModel[];
  has_study: string;
  has_publication: DatasetPublicationModel[];
  has_experiment: DatasetExperimentModel[];
  status: string;
  creation_date: string;
  update_date: string;
}

export interface FileModel {
  accession: string;
  alias: string;
  name: string;
  format: string;
}

export interface ExperimentEmbeddedModel {
  title: string;
  sequencing_protocol: {
    instrument_model: string;
  };
  description: string;
  accession: string;
  alias: string;
  type: string;
}

export interface PublicationModel {
  accession: string;
  title: string;
  abstract: string;
  journal: string;
  year: number;
  author: string;
  doi: string;
  alias: string;
}

export interface SampleModel {
  accession: string;
  name: string;
  description: string;
  alias: string;
  individual: {
    accession: string;
    alias: string;
    phenotypic_features_terms: string[];
    diagnosis_terms: string[];
    sex: string;
    geographical_region_term: string;
  };
  case_control_status: string;
  biospecimen_type: string;
  biospecimen_tissue_term: string;
}

export interface ProjectModel {
  id: string;
  title: string;
  alias: string;
  has_attribute: AttributeModel[];
  description: string;
  accession: string;
  ega_accession: string;
}

export interface StudyEmbeddedModel {
  accession: string;
  alias: string;
  title: string;
  description: string;
  types: string[];
  affiliations: string[];
  attributes: AttributeModel[];
  publications: PublicationModel[];
}

export interface DataAccessPolicyModel {
  accession: string;
  alias: string;
  name: string;
  description: string;
  policy_text: string;
  policy_url: string;
  data_access_committee: DataAccessCommitteeModel;
}

export interface DataAccessCommitteeModel {
  accession: string;
  alias: string;
  email: string;
  institute: string;
}

export interface DataAccessCommitteeMemberModel {
  email: string;
  id: string;
  organization: string;
}

export interface AttributeModel {
  key: string;
  value: string;
}

export interface DatasetEmbeddedModel {
  accession: string;
  alias: string;
  title: string;
  description: string;
  types: string[];
  experiments: ExperimentEmbeddedModel[] | undefined;
  study_files: FileModel[];
  sample_files: FileModel[];
  sequencing_process_files: FileModel[];
  analysis_process_output_files: FileModel[];
  samples: SampleModel[];
  study: StudyEmbeddedModel;
  data_access_policy: DataAccessPolicyModel;
}

export interface HitContentModel {
  accession: string;
  title: string;
  description: string;
  types: string[];
  study_files: string[];
  study: StudyEmbeddedModel;
  samples: string[];
  sequencing_experiments: string[];
}

export interface HitModel {
  document_type: string;
  context: string | null;
  content: HitContentModel;
}

export interface SearchResponseModel {
  facets: FacetModel[];
  count: number;
  hits: HitModel[];
}

export interface DatasetDetailsSummaryModel {
  title: string;
  description: string;
  accession: string;
  types: string[];
  dac_email: string;
  samples_summary: SampleSummaryModel;
  studies_summary: StudySummaryModel;
  experiments_summary: ExperimentSummaryModel;
  files_summary: FileSummaryModel;
}

export interface DatasetSummaryModel {
  count: number;
}

export interface SampleSummaryModel {
  count: number;
  stats: {
    sex: { value: string; count: number }[];
    tissues: { value: string; count: number }[];
    phenotypic_features: { value: string; count: number }[];
  };
}

export interface StudySummaryModel {
  count: number;
  stats: {
    accession: string[];
    title: string[];
  };
}

export interface ExperimentSummaryModel {
  count: number;
  stats: {
    experiment_methods: { value: string; count: number }[];
  };
}

export interface FileSummaryModel {
  count: number;
  stats: {
    format: { value: string; count: number }[];
  };
}

export interface IndividualSummaryModel {
  count: number;
  stats: {
    sex: { value: string; count: number }[];
  };
}

export interface ExperimentMethodSummaryModel {
  count: number;
  stats: {
    instrument_model: { value: string; count: number }[];
  };
}

export interface MetadataSummaryModel {
  resource_stats: {
    Dataset: DatasetSummaryModel;
    Individual: IndividualSummaryModel;
    ExperimentMethod: ExperimentMethodSummaryModel;
    AnalysisProcessOutputFile: FileSummaryModel;
    SequencingProcessFile: FileSummaryModel;
    StudyFile: FileSummaryModel;
  };
}
