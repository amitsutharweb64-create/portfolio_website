import Profile from '../models/Profile.js';

// @desc    Get portfolio profile data
// @route   GET /api/profile
// @access  Public
export const getProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      // Seed default profile for Amit Suthar if none exists
      profile = await Profile.create({
        name: 'Amit Suthar',
        title: 'Full-Stack Developer & 3D Web Enthusiast',
        bio: 'Building production-ready, interactive web applications with modern reactive architectures, Three.js 3D animations, and secure cloud microservices.',
        about: 'I am Amit Suthar, a creative full-stack developer committed to writing clean, maintainable code and engineering memorable digital experiences. From building robust Express/MongoDB backend APIs to rendering silky smooth 3D scenes in the browser, I treat software craft with care and curiosity.',
        learningJourney: 'Constantly expanding knowledge across modern reactive architectures, real-time distributed systems, Three.js shader pipelines, and cloud-native deployment patterns.',
        careerGoals: 'Aspiring to build scalable products, collaborate with world-class engineering teams, and deliver intuitive web experiences that seamlessly blend design and technology.',
        email: 'amit.suthar.dev@example.com',
        location: 'India',
        status: 'Available for full-time roles & projects',
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
        twitter: '',
        resumeUrl: '',
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
      });
    }

    res.status(200).json({
      success: true,
      data: profile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching profile data',
    });
  }
};

// @desc    Update portfolio profile
// @route   PUT /api/profile
// @access  Private (Admin only)
export const updateProfile = async (req, res) => {
  try {
    let profile = await Profile.findOne();

    if (!profile) {
      profile = await Profile.create(req.body);
    } else {
      profile = await Profile.findByIdAndUpdate(profile._id, req.body, {
        new: true,
        runValidators: true,
      });
    }

    res.status(200).json({
      success: true,
      data: profile,
      message: 'Profile updated successfully',
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to update profile',
    });
  }
};
