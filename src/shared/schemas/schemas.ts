/**
 * Helper functions to create schemas
 *
 * @format
 */

import { Location, Schema } from 'express-validator';

// Field schemas for validation
type FieldSchema = {
  name: string;
  options: object;
};

// Field schemas with additional options for validation
type FieldSchemaPlus = {
  fieldSchema: FieldSchema;
  optional: boolean;
  in: Location[];
};

/**
 * Helper function to create a schema for validation based on a list of field schemas
 * @param FieldSchema List of field schemas to create a schema for validation
 */
function createSchema(FieldSchemas: FieldSchemaPlus[]) {
  const schema: Schema = {};
  FieldSchemas.forEach(fieldSchema => {
    schema[fieldSchema.fieldSchema.name] = {
      ...fieldSchema.fieldSchema.options,
      optional: fieldSchema.optional,
      in: fieldSchema.in,
    };
  });
  return schema;
}

export { FieldSchema, createSchema };
