// Copyright 2021 - 2023 Universität Tübingen, DKFZ, EMBL, and Universität zu Köln
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
//

export enum IVAStatus {
  Unverified = "Unverified",
  CodeRequested = "CodeRequested",
  CodeCreated = "CodeCreated",
  CodeTransmitted = "CodeTransmitted",
  Verified = "Verified",
}
export enum IVAType {
  Phone = "Phone",
  Fax = "Fax",
  PostalAddress = "PostalAddress",
  InPerson = "InPerson",
}
export interface IVA {
  id: string;
  type: IVAType;
  value: string;
  changed: string;
  status: IVAStatus;
}

export interface EmbeddedIVA {
  id: string;
  type: IVAType;
  value: string;
  changed: string;
  status: IVAStatus;
  user_id: string;
  user_name: string;
  user_email: string;
}
