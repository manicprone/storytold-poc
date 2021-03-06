import objectUtils from '../utils/object-utils';
import Model from './Model';

export default class Chapter extends Model {
  constructor(options = {}) {
    super();
    this.model = 'Chapter';
    this.id = objectUtils.get(options, 'id', null);
    this.user_id = objectUtils.get(options, 'user_id', null);
    this.title = objectUtils.get(options, 'title', null);
    this.subtitle = objectUtils.get(options, 'subtitle', null);
    this.label = objectUtils.get(options, 'label', null);
    this.description = objectUtils.get(options, 'description', null);
    this.image_url = objectUtils.get(options, 'image_url', null);
    this.started_at = objectUtils.get(options, 'started_at', null);
    this.finished_at = objectUtils.get(options, 'finished_at', null);
  }
}
