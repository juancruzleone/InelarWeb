export const fetchUserProfile = async (id, router) => {
    try {
      const userData = localStorage.getItem("userData");
      if (!userData) {
        router.push("/login");
        return null;
      }
      const parsedUserData = JSON.parse(userData);
      if (parsedUserData.cuenta._id !== id) {
        router.push("/login");
        return null;
      }
      return parsedUserData.cuenta;
    } catch (error) {
      console.error("Error fetching user data:", error);
      throw new Error("Error al cargar los datos del usuario");
    }
  };
  
  export const updateUserProfile = async (newUserName, setUser, setShowEditModal, setShowConfirmationModal, setError) => {
    try {
      const userData = JSON.parse(localStorage.getItem("userData"));
      const token = userData.token;
  
      const response = await fetch(`https://inelarweb-back.onrender.com/api/cuenta/profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ userName: newUserName })
      });
  
      if (response.ok) {
        setUser(prevUser => ({
          ...prevUser,
          userName: newUserName
        }));
  
        setShowEditModal(false);
        setShowConfirmationModal(true);
        setTimeout(() => {
          setShowConfirmationModal(false);
        }, 3000);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setError(error.message);
    }
  };
  