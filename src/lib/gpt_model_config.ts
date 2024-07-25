import fs from 'fs';
import { promisify } from 'util';
import { memoize } from 'lodash';

// Convert fs.readFile into Promise version of same    
const readFile = promisify(fs.readFile);

enum ModelConfigKeysEnum {
  CURRENT_MODEL = 'current_model',
  AVAILABLE_MODELS = 'available_models',
}

// Memoize function to cache the results
const get_model_config = memoize(async (key: ModelConfigKeysEnum): Promise<any> => {
  const data = await readFile('/model_config.json', 'utf8');
  const config = JSON.parse(data);
  
  if (key in config) {
    return config[key];
  } else {
    throw new Error(`Key ${key} does not exist in config`);
  }
});

export { ModelConfigKeysEnum, get_model_config };
