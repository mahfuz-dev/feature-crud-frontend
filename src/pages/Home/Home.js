import firebase from "firebase/app";
import React, { useEffect,useContext, useState  } from "react";
import { AuthContext } from "../../App";
import { initializeLoginFramework } from "../../components/Account/loginManager/loginManager";
import Header from "../../components/Header/Header";
import Hero from "../../components/Hero/Hero";

const Home = () => {
  const [search, setSearch] = useState("");
  const [features, setFeatures] = useState([]);
  const [loggedInUser, setLoggedInUser] = useContext(AuthContext);
  initializeLoginFramework();
  useEffect(() => {
    checkUserLoggedIn();
  }, []);
  const checkUserLoggedIn = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setLoggedInUser({
          isSignedIn: true,
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
          error: user.error ? user.error : "",
          success: true,
        });
      } else {
        setLoggedInUser({
          isSignedIn: false,
          name: "",
          email: "",
          photo: "",
          error: "",
          success: false,
        });
      }
    });
  };

  const getSearchResult = (searchTerm) => {
    setSearch(searchTerm);
  };

  useEffect(() => {
    fetch(`https://safe-lake-59483.herokuapp.com/getPublishedFeatures?search=${search}`)
      .then((res) => res.json())
      .then((data) => setFeatures(data));
  }, [search]);

  useEffect(() => {
    try {
      fetch("https://safe-lake-59483.herokuapp.com/getPublishedFeatures")
        .then((res) => res.json())
        .then((data) => setFeatures(data));
    } catch (error) {
      console.log(error);
    }
  }, []);

  
  
 

  const getVotes = () => {
    try {
      fetch(`https://safe-lake-59483.herokuapp.com/votes`)
        .then((res) => res.json())
        .then((data) => sortFeaturesByVotes(data));
    } catch (error) {}
  };

  const sortFeaturesByVotes = (votes) => {
    let contentIds = [];

    votes.map((vote) => {
      contentIds.push(...contentIds, vote.contentId);
    });

    let uniqueContentIds = [...new Set(contentIds)];

    const filteredData = uniqueContentIds.map((key) => {
      const data = votes.filter((vote) => vote.contentId === key);
      data.contentId = key;

      return data;
    });

    const desc = filteredData.sort((a, b) => b.length - a.length);

    const descOrder = desc.map((element) => {
      return features.filter((feature) => feature._id === element.contentId);
    });

    const newData = descOrder.map((el) => {
      return Object.assign({}, ...el);
    });

    setFeatures(newData);
  };

  const getComments = () => {
    try {
      fetch(`https://safe-lake-59483.herokuapp.com/comments`)
        .then((res) => res.json())
        .then((data) => {
          sortFeaturesByComments(data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const sortFeaturesByComments = (comments) => {
    let contentIds = [];
    comments.map((comment) =>
      contentIds.push(...contentIds, comment.contentId)
    );
    let uniqueContentIds = [...new Set(contentIds)];

    let filteredData = uniqueContentIds.map((key) => {
      const data = comments.filter((comment) => comment.contentId === key);
      data.contentId = key;

      return data;
    });

    const desc = filteredData.sort((a, b) => b.length - a.length);

    const descOrder = desc.map((element) => {
      return features.filter((feature) => feature._id === element.contentId);
    });

    const newData = descOrder.map((el) => {
      return Object.assign({}, ...el);
    });

    setFeatures(newData);
  };

  const sortFeaturesByAlphabetically = () => {
    // let sortedData =  features.sort((a, b) => {
    //    if (a.title < b.title) {
    //      return -1;
    //    }
    //    else if (a.title > b.title) {
    //      return 1;
    //    }
    //    return 0 ;
    //  });

    try {
      const sortedData = features.sort((a, b) => a.title.localeCompare(b.title))

      const newData = [...sortedData]

      console.log(newData)
  
      setFeatures(newData)
    } catch (error) {
      
    }

   };


 
  console.log(features)
  return (
    <>
      <Header getSearchResult={getSearchResult} />
      <Hero
        features={features}
        loggedInUser={loggedInUser}
        getComments={getComments}
        getVotes={getVotes}
        sortFeaturesByAlphabetically={sortFeaturesByAlphabetically}
      />
    </>
  );
};

export default Home;
