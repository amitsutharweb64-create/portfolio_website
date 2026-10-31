import Skill from '../models/Skill.js';

// @desc    Get all skills
// @route   GET /api/skills
// @access  Public
export const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find().sort({ order: 1 });
    res.status(200).json({
      success: true,
      count: skills.length,
      data: skills,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching skills',
    });
  }
};

// @desc    Create skill category
// @route   POST /api/skills
// @access  Private (Admin only)
export const createSkillCategory = async (req, res) => {
  try {
    const skillCategory = await Skill.create(req.body);
    res.status(201).json({
      success: true,
      data: skillCategory,
      message: 'Skill category created successfully',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to create skill category',
    });
  }
};

// @desc    Update skill category
// @route   PUT /api/skills/:id
// @access  Private (Admin only)
export const updateSkillCategory = async (req, res) => {
  try {
    const skillCategory = await Skill.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!skillCategory) {
      return res.status(404).json({ success: false, message: 'Skill category not found' });
    }

    res.status(200).json({
      success: true,
      data: skillCategory,
      message: 'Skill category updated successfully',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to update skill category',
    });
  }
};

// @desc    Delete skill category
// @route   DELETE /api/skills/:id
// @access  Private (Admin only)
export const deleteSkillCategory = async (req, res) => {
  try {
    const skillCategory = await Skill.findByIdAndDelete(req.params.id);
    if (!skillCategory) {
      return res.status(404).json({ success: false, message: 'Skill category not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Skill category deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to delete skill category',
    });
  }
};
