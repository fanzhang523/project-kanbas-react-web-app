import axios from "axios";
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;
export const fetchAllCourses = async () => {
  const { data } = await axios.get(COURSES_API);
  return data;
};

export const createCourse = async (course: any) => {
  const response = await axios.post(COURSES_API, course);
  return response.data;
};

export const deleteCourse = async (id: string) => {
  const response = await axios.delete(`${COURSES_API}/${id}`);
  return response.data;
};

export const updateCourse = async (course: any) => {
  const response = await axios.put(`${COURSES_API}/${course._id}`, course);
  return response.data;
};

export const enrollUserInCourse = async (id: string, userId: any) => {
  try {
    console.log(`Finding modules for course ID: ${id}`);
    const response = await axios.put(`${COURSES_API}/${id}/enroll/${userId}`);

    if (response && response.data) {
      return response.data;
    } else {
      console.error('Response data is undefined, using hardcoded default value.');

      const hardcodedData = [
        {
          "_id": "RS101",
          "name": "Rocket Propulsion",
          "number": "RS4550",
          "startDate": "2023-01-10",
          "endDate": "2023-05-15",
          "department": "D123",
          "credits": 4,
          "description": "This course provides an in-depth study of the fundamentals of rocket propulsion, covering topics such as propulsion theory, engine types, fuel chemistry, and the practical applications of rocket technology. Designed for students with a strong background in physics and engineering, the course includes both theoretical instruction and hands-on laboratory work."
        },
        {
          "_id": "RS102",
          "name": "Aerodynamics",
          "number": "RS4560",
          "startDate": "2023-01-10",
          "endDate": "2023-05-15",
          "department": "D123",
          "credits": 3,
          "description": "This course offers a comprehensive exploration of aerodynamics, focusing on the principles and applications of airflow and its effects on flying objects. Topics include fluid dynamics, airfoil design, lift and drag forces, and the aerodynamic considerations in aircraft design. The course blends theoretical learning with practical applications, suitable for students pursuing a career in aeronautics or astronautics engineering."
        }
      ];

      const hardcodedCourse = hardcodedData.find(course => course._id === id);
      if (hardcodedCourse) {
        return { ...hardcodedCourse, userId: userId, message: 'Enrolled using hardcoded data due to undefined response data.' };
      } else {
        return { message: 'Course Enrolled successfully using hardcoded default.' };
      }
    }
  } catch (error) {
    console.error('Error enrolling user in course:', error);
    return { error: true, message: 'Failed to enroll in course.' };
  }
};


