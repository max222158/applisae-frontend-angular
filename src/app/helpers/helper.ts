import { FormGroup } from '@angular/forms';

export function clearInput(groupForm: FormGroup, fields: string[]): void {
  const resetFields = fields.reduce((acc, field) => ({ ...acc, [field]: '' }), {});
  groupForm.patchValue(resetFields);
}

export function extractLastSegment(url: string): string {
  const segments = url.split('/');
  return segments[segments.length - 1];
}