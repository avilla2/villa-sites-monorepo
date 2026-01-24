import fetch from 'cross-fetch'

/**
 * REST API Client for Strapi
 * Handles all CRUD operations via Strapi REST API
 */
export class StrapiRESTClient {
  constructor (endpoint, apiToken) {
    // Convert GraphQL endpoint to REST endpoint
    this.endpoint = endpoint
    this.headers = {
      'Content-Type': 'application/json',
      ...(apiToken ? { Authorization: `Bearer ${apiToken}` } : {})
    }
  }

  /**
   * Generic GET request
   */
  async get (path, params = {}) {
    const queryString = new URLSearchParams(params).toString()
    const url = `${this.endpoint}${path}${queryString ? `?${queryString}` : ''}`

    const response = await fetch(url, {
      method: 'GET',
      headers: this.headers
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(`REST API error: ${JSON.stringify(result.error)}`)
    }

    return result
  }

  /**
   * Generic POST request
   */
  async post (path, data) {
    const response = await fetch(`${this.endpoint}${path}`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({ data })
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(`REST API error: ${JSON.stringify(result.error)}`)
    }

    return result
  }

  /**
   * Generic PUT request
   */
  async put (path, data) {
    const response = await fetch(`${this.endpoint}${path}`, {
      method: 'PUT',
      headers: this.headers,
      body: JSON.stringify({ data })
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(`REST API error: ${JSON.stringify(result.error)}`)
    }

    return result
  }

  /**
   * Generic DELETE request
   */
  async delete (path) {
    const response = await fetch(`${this.endpoint}${path}`, {
      method: 'DELETE',
      headers: this.headers
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(`REST API error: ${JSON.stringify(result.error)}`)
    }

    return result
  }

  // ============================================
  // WEBSITE OPERATIONS
  // ============================================

  /**
   * List all websites
   */
  async listWebsites (filters = {}, pagination = { limit: 25 }) {
    const params = {
      'populate[navbar][fields][0]': 'Name',
      'populate[footer][fields][0]': 'Name',
      'populate[homepage][fields][0]': 'PageName',
      'populate[site_settings][fields][0]': 'Name'
    }

    if (filters.name) {
      params['filters[name][$containsi]'] = filters.name
    }

    if (pagination.limit) {
      params['pagination[limit]'] = pagination.limit
    }

    return this.get('/websites', params)
  }

  /**
   * Get a website by document ID
   */
  async getWebsite (documentId) {
    return this.get(`/websites/${documentId}`, {
      'populate[navbar][fields][0]': 'Name',
      'populate[navbar][fields][1]': 'Style',
      'populate[navbar][fields][2]': 'Appearance',
      'populate[navbar][fields][3]': 'FontColor',
      'populate[footer][fields][0]': 'Name',
      'populate[footer][fields][1]': 'FontColor',
      'populate[homepage][fields][0]': 'PageName',
      'populate[homepage][fields][1]': 'Title',
      'populate[site_settings][fields][0]': 'Name',
      'populate[site_settings][fields][1]': 'SiteTitle',
      'populate[site_settings][fields][2]': 'EnableLocalization',
      'populate[site_settings][fields][3]': 'DesktopBreakpoint',
      'populate[content_pages][fields][0]': 'Name',
      'populate[content_pages][fields][1]': 'Link',
      'populate[content_pages][fields][2]': 'Title'
    })
  }

  /**
   * Create a website
   */
  async createWebsite (data) {
    return this.post('/websites', data)
  }

  /**
   * Update a website
   */
  async updateWebsite (documentId, data) {
    return this.put(`/websites/${documentId}`, data)
  }

  /**
   * Delete a website
   */
  async deleteWebsite (documentId) {
    return this.delete(`/websites/${documentId}`)
  }

  // ============================================
  // CONTENT PAGE OPERATIONS
  // ============================================

  /**
   * List content pages
   */
  async listContentPages (filters = {}, pagination = { limit: 25 }) {
    const params = {}

    if (filters.Name) {
      params['filters[Name][$containsi]'] = filters.Name
    }

    if (filters.website) {
      params['filters[website][documentId][$eq]'] = filters.website.documentId.eq
    }

    if (pagination.limit) {
      params['pagination[limit]'] = pagination.limit
    }

    return this.get('/content-pages', params)
  }

  /**
   * Get a content page by document ID
   */
  async getContentPage (documentId) {
    return this.get(`/content-pages/${documentId}`, { populate: '*' })
  }

  /**
   * Create a content page
   */
  async createContentPage (data) {
    return this.post('/content-pages', data)
  }

  /**
   * Update a content page
   */
  async updateContentPage (documentId, data) {
    return this.put(`/content-pages/${documentId}`, data)
  }

  /**
   * Delete a content page
   */
  async deleteContentPage (documentId) {
    return this.delete(`/content-pages/${documentId}`)
  }

  // ============================================
  // NAVBAR OPERATIONS
  // ============================================

  /**
   * Create a navbar
   */
  async createNavbar (data) {
    return this.post('/website-navbars', data)
  }

  /**
   * Update a navbar
   */
  async updateNavbar (documentId, data) {
    return this.put(`/website-navbars/${documentId}`, data)
  }

  /**
   * Get a navbar by document ID
   */
  async getNavbar (documentId) {
    return this.get(`/website-navbars/${documentId}`, { populate: '*' })
  }

  // ============================================
  // FOOTER OPERATIONS
  // ============================================

  /**
   * Create a footer
   */
  async createFooter (data) {
    return this.post('/website-footers', data)
  }

  /**
   * Update a footer
   */
  async updateFooter (documentId, data) {
    return this.put(`/website-footers/${documentId}`, data)
  }

  /**
   * Get a footer by document ID
   */
  async getFooter (documentId) {
    return this.get(`/website-footers/${documentId}`, { populate: '*' })
  }

  // ============================================
  // HOMEPAGE OPERATIONS
  // ============================================

  /**
   * Create a homepage
   */
  async createHomepage (data) {
    return this.post('/website-homepages', data)
  }

  /**
   * Get a homepage by document ID
   */
  async getHomepage (documentId) {
    return this.get(`/website-homepages/${documentId}`, { populate: '*' })
  }

  /**
   * Update a homepage
   */
  async updateHomepage (documentId, data) {
    return this.put(`/website-homepages/${documentId}`, data)
  }

  // ============================================
  // SITE SETTINGS OPERATIONS
  // ============================================

  /**
   * Create site settings
   */
  async createSiteSettings (data) {
    return this.post('/website-site-settings', data)
  }

  /**
   * Update site settings
   */
  async updateSiteSettings (documentId, data) {
    return this.put(`/website-site-settings/${documentId}`, data)
  }

  /**
   * Get site settings by document ID
   */
  async getSiteSettings (documentId) {
    return this.get(`/website-site-settings/${documentId}`, { populate: '*' })
  }

  // ============================================
  // RELATION MANAGEMENT
  // ============================================

  /**
   * Update website relations (navbar, footer, homepage, site_settings, content_pages)
   */
  async updateWebsiteRelations (documentId, data) {
    return this.put(`/websites/${documentId}`, data)
  }

  /**
   * Connect content pages to a website
   * @param {string} documentId - Website document ID
   * @param {string[]} contentPageIds - Array of content page document IDs to connect
   */
  async connectContentPages (documentId, contentPageIds) {
    const data = {
      content_pages: {
        connect: contentPageIds.map(id => ({ documentId: id }))
      }
    }

    return this.updateWebsiteRelations(documentId, data)
  }

  /**
   * Disconnect content pages from a website
   * @param {string} documentId - Website document ID
   * @param {string[]} contentPageIds - Array of content page document IDs to disconnect
   */
  async disconnectContentPages (documentId, contentPageIds) {
    const data = {
      content_pages: {
        disconnect: contentPageIds.map(id => ({ documentId: id }))
      }
    }

    return this.updateWebsiteRelations(documentId, data)
  }

  /**
   * Set content pages for a website (replaces existing)
   * @param {string} documentId - Website document ID
   * @param {string[]} contentPageIds - Array of content page document IDs to set
   */
  async setContentPages (documentId, contentPageIds) {
    const data = {
      content_pages: {
        set: contentPageIds.map(id => ({ documentId: id }))
      }
    }

    return this.updateWebsiteRelations(documentId, data)
  }
}
