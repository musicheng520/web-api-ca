import jwt from 'jsonwebtoken';
import User from '../api/users/userModel';

const authenticate = async (request, response, next) => {
  try {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      return response.status(401).json({ success: false, msg: 'No authorization header' });
    }

    const [scheme, token] = authHeader.split(' ');
    if (!scheme || scheme.toLowerCase() !== 'bearer') {
      return response.status(401).json({ success: false, msg: 'Invalid authorization scheme' });
    }
    if (!token) {
      return response.status(401).json({ success: false, msg: 'Bearer token not found' });
    }

    const decoded = jwt.verify(token, process.env.SECRET);

    let user = null;
    if (decoded.id) {
      user = await User.findById(decoded.id);
    } else if (decoded.username) {
      user = await User.findByUserName(decoded.username);
    }

    if (!user) {
      return response.status(401).json({ success: false, msg: 'User not found' });
    }

    request.user = user;
    next();
  } catch (err) {
    return response.status(401).json({
      success: false,
      msg: `Unauthorized: ${err.message}`
    });
  }
};

export default authenticate;
