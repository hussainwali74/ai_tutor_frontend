
export async function getSubjectSerice(){
    // throw Error('Failed to fetch Subjects')

    try {
        const response = await fetch("/api/admin/subject");
        if (!response.ok) throw new Error("Failed to fetch Subject");
        const fetchedSubjects = await response.json();
        return fetchedSubjects        
      } catch (err) {
        console.log("-----------------------------------------------------");
        console.log("err fetchSubjects", err);
        console.log("-----------------------------------------------------");
  
        throw Error('Failed to fetch Subjects')
      }
}

export async function getTopicSerice(){
    // throw Error('Failed to fetch Topics')

    try {
        const response = await fetch("/api/admin/topic");
        if (!response.ok) throw new Error("Failed to fetch Topic");
        const fetchedTopics = await response.json();
        return fetchedTopics        
      } catch (err) {
        console.log("-----------------------------------------------------");
        console.log("err fetchTopics", err);
        console.log("-----------------------------------------------------");
  
        throw Error('Failed to fetch Topics')
      }
}