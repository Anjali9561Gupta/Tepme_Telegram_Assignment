export const fetchGraphQL = async (query: string, variables: Record<string, any>) => {
    const response = await fetch('/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, variables }),
    });
  
    if (!response.ok) {
      throw new Error('Failed to fetch from GraphQL API');
    }
  
    return response.json();
  };
  