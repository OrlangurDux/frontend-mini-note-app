import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { Domains } from '../lib/domains';

const DomainContext = createContext(null);

export function DomainProvider({ children }) {
  const [domains, setDomains] = useState([]);
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    setDomains(Domains.list());
    setActiveId(Domains.getActiveId());
  }, []);

  const setActive = useCallback((id) => {
    Domains.setActiveId(id);
    setActiveId(id);
  }, []);

  const addDomain = useCallback((label, baseUrl) => {
    const id = Domains.add({ label, baseUrl });
    setDomains(Domains.list());
    return id;
  }, []);

  const removeDomain = useCallback((id) => {
    Domains.remove(id);
    setDomains(Domains.list());
    setActiveId(Domains.getActiveId());
  }, []);

  const activeDomain = domains.find((d) => d.id === activeId) || domains[0] || null;

  return (
    <DomainContext.Provider value={{ domains, activeId, activeDomain, setActive, addDomain, removeDomain }}>
      {children}
    </DomainContext.Provider>
  );
}

export function useDomains() {
  return useContext(DomainContext);
}
