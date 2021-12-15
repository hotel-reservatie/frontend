import {
  TextBlock,
  MediaBlock,
  TextRow,
  RectShape,
  RoundShape,
} from 'react-placeholder/lib/placeholders'

const Skeleton = (
  <div>
    <RectShape color="blue" style={{ width: 30, height: 80 }} />
    <TextBlock rows={7} color="yellow" />
  </div>
)

export default Skeleton
