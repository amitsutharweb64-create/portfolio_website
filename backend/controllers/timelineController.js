import Timeline from '../models/Timeline.js';

// @desc    Get all timeline events (education & experience)
// @route   GET /api/timeline
// @access  Public
export const getTimeline = async (req, res) => {
  try {
    const timeline = await Timeline.find().sort({ order: 1, createdAt: -1 });
    res.status(200).json({
      success: true,
      count: timeline.length,
      data: timeline,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching timeline items',
    });
  }
};

// @desc    Create timeline entry
// @route   POST /api/timeline
// @access  Private (Admin only)
export const createTimeline = async (req, res) => {
  try {
    const item = await Timeline.create(req.body);
    res.status(201).json({
      success: true,
      data: item,
      message: 'Timeline item created successfully',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to create timeline item',
    });
  }
};

// @desc    Update timeline entry
// @route   PUT /api/timeline/:id
// @access  Private (Admin only)
export const updateTimeline = async (req, res) => {
  try {
    const item = await Timeline.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!item) {
      return res.status(404).json({ success: false, message: 'Timeline item not found' });
    }

    res.status(200).json({
      success: true,
      data: item,
      message: 'Timeline item updated successfully',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to update timeline item',
    });
  }
};

// @desc    Delete timeline entry
// @route   DELETE /api/timeline/:id
// @access  Private (Admin only)
export const deleteTimeline = async (req, res) => {
  try {
    const item = await Timeline.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({ success: false, message: 'Timeline item not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Timeline item deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete timeline item',
    });
  }
};
